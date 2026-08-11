import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/utils.js'

const defaultStaggerTimes = {
  char: 0.03,
  line: 0.1,
  word: 0.05,
}

const defaultContainerVariants = {
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const defaultItemVariants = {
  exit: { opacity: 0 },
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

/** em-based offsets scale with type size on small screens */
const presetVariants = {
  blur: {
    container: defaultContainerVariants,
    item: {
      exit: { filter: 'blur(8px)', opacity: 0 },
      hidden: { filter: 'blur(8px)', opacity: 0 },
      visible: { filter: 'blur(0px)', opacity: 1 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      exit: { opacity: 0 },
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  'fade-in-blur': {
    container: defaultContainerVariants,
    item: {
      exit: { filter: 'blur(8px)', opacity: 0, y: '0.55em' },
      hidden: { filter: 'blur(8px)', opacity: 0, y: '0.55em' },
      visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      exit: { opacity: 0, scale: 0.92 },
      hidden: { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      exit: { opacity: 0, y: '0.5em' },
      hidden: { opacity: 0, y: '0.5em' },
      visible: { opacity: 1, y: 0 },
    },
  },
}

function splitText(text, per) {
  if (per === 'line') return text.split('\n')
  return text.split(/(\s+)/)
}

function RevealClip({ children, className }) {
  return (
    <span className={cn('text-reveal-clip inline-block max-w-full overflow-hidden align-bottom', className)}>
      {children}
    </span>
  )
}

function SegmentItem({ segment, variants, per, wrapperClassName }) {
  const motionClass = 'text-reveal-segment inline-block whitespace-pre will-change-transform'

  const content =
    per === 'line' ? (
      <RevealClip className={cn('block w-full', wrapperClassName)}>
        <motion.span className={cn(motionClass, 'block')} variants={variants}>
          {segment}
        </motion.span>
      </RevealClip>
    ) : per === 'word' ? (
      <RevealClip className={wrapperClassName}>
        <motion.span aria-hidden="true" className={motionClass} variants={variants}>
          {segment}
        </motion.span>
      </RevealClip>
    ) : (
      <RevealClip className={wrapperClassName}>
        <motion.span className={motionClass}>
          {segment.split('').map((char, i) => (
            <motion.span
              aria-hidden="true"
              className={motionClass}
              key={`${char}-${i}`}
              variants={variants}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </RevealClip>
    )

  return content
}

export function TextReveal({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  preset = 'fade',
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
}) {
  const segments = splitText(children, per)
  const MotionTag = motion[as] ?? motion.p

  const base = preset ? presetVariants[preset] : { container: defaultContainerVariants, item: defaultItemVariants }
  const stagger = defaultStaggerTimes[per] / speedReveal
  const baseDuration = 0.3 / speedSegment

  const containerVars = {
    ...base.container,
    visible: {
      ...base.container.visible,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
        ...containerTransition,
      },
    },
  }

  const itemVars = {
    ...base.item,
    visible: {
      ...(base.item.visible ?? {}),
      transition: { duration: baseDuration, ease: [0.16, 1, 0.3, 1], ...segmentTransition },
    },
  }

  const computedVariants = variants
    ? {
        container: { ...containerVars, ...variants.container },
        item: { ...itemVars, ...variants.item },
      }
    : { container: containerVars, item: itemVars }

  return (
    <AnimatePresence mode="popLayout">
      {trigger ? (
        <MotionTag
          animate="visible"
          className={cn('text-reveal-root', className)}
          exit="exit"
          initial="hidden"
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
          variants={computedVariants.container}
        >
          {per !== 'line' ? <span className="sr-only">{children}</span> : null}
          {segments.map((segment, index) => (
            <SegmentItem
              key={`${per}-${index}-${segment}`}
              per={per}
              segment={segment}
              variants={computedVariants.item}
              wrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionTag>
      ) : null}
    </AnimatePresence>
  )
}

export default TextReveal

interface Props {
  prefix?: string;
  element: string;
  animation: string;
  infinite?: boolean;
  delay?: 2|3|4|5;
  slow?: boolean;
  slower?: boolean;
}

export const animateCSS = (props: Props) => {
  // We create a Promise and return it
  return new Promise((resolve) => {
    const {
      prefix = 'animate__',
      element,
      animation,
      infinite = false,
      delay,
      slow,
      slower
    } = props

    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element) as HTMLElement;

    node.classList.add(animationName)

    if (infinite) {
      node.classList.add(`${prefix}infinite`)
    }

    if (delay && delay > 1) {
      node.classList.add(`${prefix}delay-${delay}s`)
    }

    if (slow) {
      node.classList.add(`${prefix}slow`)
    }

    if (slower) {
      node.classList.add(`${prefix}slower`)
    }

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event: Event) {
      const classes = [animationName, `${prefix}slow`, `${prefix}slower`, `${prefix}infinite`, `${prefix}delay-${delay}s`]
      event.stopPropagation();
      classes.forEach(className => node.classList.remove(className))
      resolve(true);
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
}
export const DISTANCE = 50000;
export const getSpeed = (velocity: string) =>
  DISTANCE / parseInt(velocity!, 10);

/* this.roadDistance =
this.raceField.element.clientWidth - this.containerCar.element.offsetLeft;
this.containerCar.element.style.transform = `translateX(${this.roadDistance}px)`;
this.containerCar.element.style.transitionDuration = `${speed / 1000}s`; */

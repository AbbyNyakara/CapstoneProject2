import { mealsCounter, commentsCounter } from '../__mocks__/function';

const mealsData = [
  {
    foodId: 1,
    foodName: 'food1',
    foodImg: 'img1.jpg',
  },
  {
    foodId: 2,
    foodName: 'food2',
    foodImg: 'img2.jpg',
  },
  {
    foodId: 3,
    foodName: 'food3',
    foodImg: 'img3.jpg',
  },
  {
    foodId: 4,
    foodName: 'food4',
    foodImg: 'img4.jpg',
  },
  {
    foodId: 5,
    foodName: 'food5',
    foodImg: 'img5.jpg',
  },
];

const commentsData = [
  { date: '2017/07/01', name: 'Abby', comment: 'Amazing' },
  { date: '2017/07/01', name: 'Angela', comment: 'Amazing' },
  { date: '2017/07/01', name: 'Maria', comment: 'Amazing' },
  { date: '2017/07/01', name: 'Shaheer', comment: 'Amazing' },
];

describe('Food list and comments counter', () => {
  test('Should count the meals on the page', () => {
    expect(mealsCounter(mealsData)).toEqual(5);
  });

  test('Should count the comments on the page', () => {
    expect(commentsCounter(commentsData)).toEqual(4);
  });
});
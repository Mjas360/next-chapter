import { t } from 'i18next';

export const spotlightContent = [
  {
    title: t("Today's featured read"),
    subtitle: t('A timeless story chosen to inspire your next reading session.'),
  },
  {
    title: t('Welcome back!'),
    subtitle: t("We've picked a book we think you'll enjoy today."),
  },
  {
    title: t('Your next great read'),
    subtitle: t('Discover a classic that has captivated readers for generations.'),
  },
  {
    title: t('Picked for you'),
    subtitle: t('Sit back, relax, and dive into this handpicked recommendation.'),
  },
  {
    title: t("Readers' favorite"),
    subtitle: t('One of the most loved books among readers this week.'),
  },
  {
    title: t('Discover something timeless'),
    subtitle: t('Explore a literary classic that continues to stand the test of time.'),
  },
  {
    title: t('Ready for your next chapter?'),
    subtitle: t('Here’s a book worth adding to your reading list today.'),
  },
  {
    title: t('Today’s recommendation'),
    subtitle: t('A carefully selected title to brighten your reading journey.'),
  },
];

export const getSpotlightContent = () => {
  const randomIndex = Math.floor(Math.random() * spotlightContent.length);
  return spotlightContent[randomIndex];
};
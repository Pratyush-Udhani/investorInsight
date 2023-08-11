export enum CategoryEnum {
  ART_AND_DESIGN,
  AUTO_AND_VEHICLES,
  BEAUTY,
  BOOKS_AND_REFERENCE,
  BUSINESS,
  COMICS,
  COMMUNICATION,
  DATING,
  EDUCATION,
  ENTERTAINMENT,
  EVENTS,
  FINANCE,
  FOOD_AND_DRINK,
  HEALTH_AND_FITNESS,
  HOUSE_AND_HOME,
  LIBRARIES_AND_DEMO,
  LIFESTYLE,
  GAME,
  FAMILY,
  MEDICAL,
  SOCIAL,
  SHOPPING,
  PHOTOGRAPHY,
  SPORTS,
  TRAVEL_AND_LOCAL,
  TOOLS,
  PERSONALIZATION,
  PRODUCTIVITY,
  PARENTING,
  WEATHER,
  VIDEO_PLAYERS,
  NEWS_AND_MAGAZINES,
  MAPS_AND_NAVIGATION,
}

export const CategoryMapping: Record<CategoryEnum, string> = {
  [CategoryEnum.ART_AND_DESIGN]: 'ART_AND_DESIGN',
  [CategoryEnum.AUTO_AND_VEHICLES]: 'AUTO_AND_VEHICLES',
  [CategoryEnum.BEAUTY]: 'BEAUTY',
  [CategoryEnum.BOOKS_AND_REFERENCE]: 'BOOKS_AND_REFERENCE',
  [CategoryEnum.BUSINESS]: 'BUSINESS',
  [CategoryEnum.COMICS]: 'COMICS',
  [CategoryEnum.COMMUNICATION]: 'COMMUNICATION',
  [CategoryEnum.DATING]: 'DATING',
  [CategoryEnum.EDUCATION]: 'EDUCATION',
  [CategoryEnum.ENTERTAINMENT]: 'ENTERTAINMENT',
  [CategoryEnum.EVENTS]: 'EVENTS',
  [CategoryEnum.FINANCE]: 'FINANCE',
  [CategoryEnum.FOOD_AND_DRINK]: 'FOOD_AND_DRINK',
  [CategoryEnum.HEALTH_AND_FITNESS]: 'HEALTH_AND_FITNESS',
  [CategoryEnum.HOUSE_AND_HOME]: 'HOUSE_AND_HOME',
  [CategoryEnum.LIBRARIES_AND_DEMO]: 'LIBRARIES_AND_DEMO',
  [CategoryEnum.LIFESTYLE]: 'LIFESTYLE',
  [CategoryEnum.GAME]: 'GAME',
  [CategoryEnum.FAMILY]: 'FAMILY',
  [CategoryEnum.MEDICAL]: 'MEDICAL',
  [CategoryEnum.SOCIAL]: 'SOCIAL',
  [CategoryEnum.SHOPPING]: 'SHOPPING',
  [CategoryEnum.PHOTOGRAPHY]: 'PHOTOGRAPHY',
  [CategoryEnum.SPORTS]: 'SPORTS',
  [CategoryEnum.TRAVEL_AND_LOCAL]: 'TRAVEL_AND_LOCAL',
  [CategoryEnum.TOOLS]: 'TOOLS',
  [CategoryEnum.PERSONALIZATION]: 'PERSONALIZATION',
  [CategoryEnum.PRODUCTIVITY]: 'PRODUCTIVITY',
  [CategoryEnum.PARENTING]: 'PARENTING',
  [CategoryEnum.WEATHER]: 'WEATHER',
  [CategoryEnum.VIDEO_PLAYERS]: 'VIDEO_PLAYERS',
  [CategoryEnum.NEWS_AND_MAGAZINES]: 'NEWS_AND_MAGAZINES',
  [CategoryEnum.MAPS_AND_NAVIGATION]: 'MAPS_AND_NAVIGATION',
};

export const CategoryIdMapping: Record<string, CategoryEnum> = Object.fromEntries(
  Object.entries(CategoryMapping)
    .filter(([, value]) => value !== undefined) // Filter out entries with undefined values
    .map(([key, value]) => [value, Number(key)]) // Reversed order
);

export const categories = Object.keys(CategoryEnum).filter((v) => isNaN(Number(v)));
// Example usage:
//const category = CategoryEnum.BEAUTY;
//const categoryName = CategoryMapping[category]; // 'BEAUTY'
//
//const categoryId = 'BEAUTY';
//const categoryEnum = CategoryIdMapping[categoryId]; // CategoryEnum.BEAUTY

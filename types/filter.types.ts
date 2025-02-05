export enum SortOption {
    RECOMMENDED = 'recommended',
    PRICE_LOW_TO_HIGH = 'price_asc',
    PRICE_HIGH_TO_LOW = 'price_desc',
    STARS_LOW_TO_HIGH = 'stars_asc',
    STARS_HIGH_TO_LOW = 'stars_desc',
}

export const SORT_OPTION_LABELS: Record<SortOption, string> = {
    [SortOption.RECOMMENDED]: 'Recommended',
    [SortOption.PRICE_LOW_TO_HIGH]: 'Price (lowest first)',
    [SortOption.PRICE_HIGH_TO_LOW]: 'Price (highest first)',
    [SortOption.STARS_LOW_TO_HIGH]: 'Stars (lowest first)',
    [SortOption.STARS_HIGH_TO_LOW]: 'Stars (highest first)',
};

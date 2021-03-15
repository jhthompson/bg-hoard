export function apiUtilInterface(): string {
  return 'api-util-interface';
}

export interface Game {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
}


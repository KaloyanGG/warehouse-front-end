interface Product {

    _id: string;
    name: string;
    description?: string;
    photo?: any;
    buyPrice: number;
    sellPrice: number;
    count: number;
    type: 'Хранителни стоки' |
    'Канцеларски материали' |
    'Строителни материали';

}

export type { Product }
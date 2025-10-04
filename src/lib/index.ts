// place files you want to import through the `$lib` alias in this folder.

export interface ValueWrapper {
        id: string;
        value: number | null;
    }

export interface TabWrapper {
    value: string;
    data: ValueWrapper[];
}

export interface DataState {
    Coins: ValueWrapper[];
    Bills: ValueWrapper[];
    Rolls: ValueWrapper[];
}

export const defaultDataState: DataState = {
    Coins: ['1c', '5c', '10c', '25c'].map(c => {
        return {id: c, value: null}
    }),
    Bills: ['$1', '$5', '$10', '$20', '$50', '$100'].map(c => {
        return {id: c, value: null}
    }),
    Rolls:
    ['Pennies', 'Nickels', 'Dimes', 'Quarters'].map(c => {
        return {id: c, value: null}
    })
};

export const convertMoneyType = (moneyType: string): number => {
    let out = 0;
    switch (moneyType) {
        case '1c':
            out = 0.01;
            break;
        case '5c':
            out = 0.05;
            break;
        case '10c':
            out = 0.1;
            break;
        case '25c':
            out = 0.25;
            break;
        case '$1':
            out = 1;
            break;
        case '$5':
            out = 5;
            break;
        case '$10':
            out = 10;
            break;
        case '$20':
            out = 20;
            break;
        case '$50':
            out = 50;
            break;
        case '$100':
            out = 100;
            break;
        case 'Pennies':
            out = 0.5;
            break;
        case 'Nickels':
            out = 2;
            break;
        case 'Dimes':
            out = 5;
            break;
        case 'Quarters':
            out = 10;
            break;
        default: break;
    }
    return out;
}

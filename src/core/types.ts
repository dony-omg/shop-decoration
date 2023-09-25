export interface IField {
    id: string | null | undefined;
    title?: string | null;
    type?: string | null | undefined;
    imageUrl?: string,
    optionSetting?: IOptionSetting<string | null | undefined>;
    disabled?: boolean;
}

export interface IOptionSetting<T> {
    [key: string]: T;
}

export interface IShopHeaderElementSetting extends IOptionSetting<string | undefined> {
    subtitle?: string;
    image?: string;
    title: string;
    [key: string]: string | undefined;
}
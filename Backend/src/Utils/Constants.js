const PropertyTypeEnum = {
    APARTMENT: 'Apartment',
    HOUSE: 'House',
    CONDO: 'Condo',
    LAND: 'Land',
}

const AvailablePropertyType = Object.values(PropertyTypeEnum);

const PropertyStatusEnum = {
    BUY: 'Buy',
    RENT: 'Rent',
}

const AvailablePropertyStatus = Object.values(PropertyStatusEnum);



const cookieOption = {
    httpOnly: true,
    secure: true
}

export {
    PropertyTypeEnum,
    AvailablePropertyType,
    PropertyStatusEnum,
    AvailablePropertyStatus,
    cookieOption
}
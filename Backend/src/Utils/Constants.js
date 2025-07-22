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


const UtilityPolicyEnum = {
    OWNER: "Owner is responsible",
    TENANT: "Tenant is responsible",
    SHARED: "Shared"
}
const  AvailableUtilityPolicy = Object.values(UtilityPolicyEnum)

const PetPolicyEnum = {
    ALLOWED: 'Pets are allowed',
    NOTALLOWED: "Pets are not allowed"
}
const AvailablePetPolicy = Object.values(PetPolicyEnum)





const cookieOption = {
    httpOnly: true,
    secure: true
}

export {
    PropertyTypeEnum,
    AvailablePropertyType,
    PropertyStatusEnum,
    AvailablePropertyStatus,
    UtilityPolicyEnum,
    AvailableUtilityPolicy,
    PetPolicyEnum,
    AvailablePetPolicy,
    cookieOption
}
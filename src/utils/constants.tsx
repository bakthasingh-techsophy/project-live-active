export const phoneNumberRegex = {
  in: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?[6789]\d{9})$/,
  us: /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
  pk: /^(?:\+92|0)?[6789]\d{11}$/,
  ca: /^(?:\+?1)?[2-9]\d{9}$/,
  gb: /^(?:\+?44)?(?:0|11)?[1-9]\d{9}$/,
  au: /^(?:\+?61)?(?:0?[2-57-8]|0?[1,9][0-9]|0?4[0-8])\d{8}$/,
  nz: /^(?:\+?64)?(0)[23456789]\d{8}$/,
  lk: /^(?:0|94|\+94)?(7(0|1|2|5|6|7|8)( |-)?\d)\d{6}$/,
  "am-AM": /^(\+?374|0)((10|[9|7][0-9])\d{6}$|[2-4]\d{7}$)/,
  "ar-AE": /^((\+?971)|0)?5[024568]\d{7}$/,
  "ar-BH": /^(\+?973)?(3|6)\d{7}$/,
  "ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
  "ar-EG": /^((\+?20)|0)?1[0125]\d{8}$/,
  "ar-IQ": /^(\+?964|0)?7[0-9]\d{8}$/,
  "ar-JO": /^(\+?962|0)?7[789]\d{7}$/,
  "ar-KW": /^(\+?965)[569]\d{7}$/,
  "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
  "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
  "ar-TN": /^(\+?216)?[2459]\d{7}$/,
  "be-BY": /^(\+?375)?(24|25|29|33|44)\d{7}$/,
  "bg-BG": /^(\+?359|0)?8[789]\d{7}$/,
  "bn-BD": /^(\+?880|0)1[13456789][0-9]{8}$/,
  "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  "da-DK": /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
  "de-DE": /^(\+49)?0?1(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7}$/,
  "de-AT": /^(\+43|0)\d{1,4}\d{3,12}$/,
  "el-GR": /^(\+?30|0)?(69\d{8})$/,
  "en-GB": /^(\+?44|0)7\d{9}$/,
  "en-GG": /^(\+?44|0)1481\d{6}$/,
  "en-GH": /^(\+233|0)(20|50|24|54|27|57|26|56|23|28)\d{7}$/,
  "en-HK": /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
  "en-MO": /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
  "en-IE": /^(\+?353|0)8[356789]\d{7}$/,
  "en-KE": /^(\+?254|0)(7|1)\d{8}$/,
  "en-MT": /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
  "en-MU": /^(\+?230|0)?\d{8}$/,
  "en-NG": /^(\+?234|0)?[789]\d{9}$/,
  "en-NZ": /^(\+?64|0)[28]\d{7,9}$/,
  "en-RW": /^(\+?250|0)?[7]\d{8}$/,
  "en-SG": /^(\+65)?[89]\d{7}$/,
  "en-TZ": /^(\+?255|0)?[67]\d{8}$/,
  "en-UG": /^(\+?256|0)?[7]\d{8}$/,
  "en-ZA": /^(\+?27|0)\d{9}$/,
  "en-ZM": /^(\+?26)?09[567]\d{7}$/,
  "es-CL": /^(\+?56|0)[2-9]\d{1}\d{7}$/,
  "es-EC": /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
  "es-ES": /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
  "es-MX": /^(\+?52)?(1|01)?\d{10,11}$/,
  "es-PA": /^(\+?507)\d{7,8}$/,
  "es-PY": /^(\+?595|0)9[9876]\d{7}$/,
  "es-UY": /^(\+598|0)9[1-9][\d]{6}$/,
  "et-EE": /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
  "fa-IR": /^(\+?98[-\s]?|0)9[0-39]\d[\s]?\d{3}[\s]?\d{4}$/,
  "fi-FI": /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
  "fj-FJ": /^(\+?679)?\s?\d{3}\s?\d{4}$/,
  "fo-FO": /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  "fr-FR": /^(\+?33|0)[67]\d{8}$/,
  "fr-GF": /^(\+?594|0|00594)[67]\d{8}$/,
  "fr-GP": /^(\+?590|0|00590)[67]\d{8}$/,
  "fr-MQ": /^(\+?596|0|00596)[67]\d{8}$/,
  "fr-RE": /^(\+?262|0|00262)[67]\d{8}$/,
  "he-IL": /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
  "hu-HU": /^(\+?36)(20|30|70)\d{7}$/,
  "id-ID":
    /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
  "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  "ja-JP": /^(\+81[ ]?(\(0\))?|0)[6789]0[ ]?\d{4}[ ]?\d{4}$/,
  "kk-KZ": /^(\+?7|8)?7\d{9}$/,
  "kl-GL": /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  "ko-KR": /^((\+?82)[ ]?)?0?1([0|1|6|7|8|9]{1})[ ]?\d{3,4}[ ]?\d{4}$/,
  "lt-LT": /^(\+370|8)\d{8}$/,
  "ms-MY": /^(\+?6?01){1}(([0145]{1}[-\s]?\d{7,8})|([236789]{1}[\s-]?\d{7}))$/,
  "nb-NO": /^(\+?47)?[49]\d{7}$/,
  "ne-NP": /^(\+?977)?9[78]\d{8}$/,
  "nl-BE": /^(\+?32|0)4?\d{8}$/,
  "nl-NL": /^(\+?31|0)6?\d{8}$/,
  "nn-NO": /^(\+?47)?[49]\d{7}$/,
  "pl-PL": /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
  "pt-BR":
    /(?=^(\+?5{2}-?|0)[1-9]{2}-?\d{4}-?\d{4}$)(^(\+?5{2}-?|0)[1-9]{2}-?[6-9]\d{3}-?\d{4}$)|(^(\+?5{2}-?|0)[1-9]{2}-?9[6-9]\d{3}-?\d{4}$)/,
  "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
  "ro-RO": /^(\+?4?0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,
  "ru-RU": /^(\+?7|8)?9\d{9}$/,
  "sl-SI":
    /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
  "sk-SK": /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
  "sv-SE": /^(\+?46|0)[\s-]?7[\s-]?[02369]([\s-]?\d){7}$/,
  "th-TH": /^(\+66|66|0)\d{9}$/,
  "tr-TR": /^(\+?90|0)?5\d{9}$/,
  "uk-UA": /^(\+?38|8)?0\d{9}$/,
  "vi-VN":
    /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-6|89]))|(9([0-9])))([0-9]{7})$/,
  "zh-CN":
    /^((\+|00)86)?1([358][0-9]|4[579]|6[67]|7[01235678]|9[189])[0-9]{8}$/,
  "zh-TW": /^(\+?886-?|0)?9\d{8}$/,
};

export const mobileRegex = /^[6-9]\d{9}$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONSTANTS = {
  ROUTES: {
    LOGIN: "/login",
    HOME: "/home",
  },
  TRUE: "true",
  SETTINGS: "settings",
  PROFILE: "profile",
  LOGOUT: "logout",
  THEME: "theme",
  SUCCESS: "success",
  INFO: "info",
  ERROR: "error",
  WARNING: "warning",
  USER_EMAIL: "user-email",
  FIRST_NAME: "first-name",
  LAST_NAME: "last-name",
  USER_ID: "user-id",
  REACT_TOKEN: "react-token",
  USER_FIELD_MISSING: "user-field-missing",
  MEMBER_ID: "member-id",
  ACCESS_TOKEN: "access-token",
  USER_TYPE: "user-type",
  LOGIN_ASSET: "login-asset",
  SAVED_USER_ASSET: "saved-user-asset",
  COUNTRY: "country",
  USER_NAME: "userName",
  API_RESPONSE_MESSAGES: {
    LOGIN_EXPIRED: "LOGIN EXPIRED",
    LOGIN_SUCCESS: "Login Successful",
    LOGIN_FAILURE: "Login Failed",
    REGISTRATION_SUCCESS: "Registration Successful. Please Login",
    REGISTRATION_FAILURE: "Registration Failed",
    EVENTS_FETCH_FAILURE: "Failed to Fetch Events",
    USER_DETAILS_FETCH_FAILURE: "Failed to Fetch User Details",
    UPDATE_USER_SUCCESS: "User Details Updated Successfully",
    UPDATE_USER_FAILURE: "Failed to Update User Details",
    UPDATE_DP_SUCCESS: "Profile Picture Updated Successfully",
    UPDATE_DP_FAILURE: "Failed to Update Profile Picture",
    UPDATE_PREFERENCES_SUCCESS: "User Preferences Updated Successfully",
    UPDATE_PREFERENCES_FAILURE: "Failed to Update User Preferences",
    EVENT_ENROLL_SUCCESS: "User Enrolled Successfully",
    EVENT_ENROLL_FAILURE: "Failed to Enroll User",
  },
};

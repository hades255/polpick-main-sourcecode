/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */

import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import DropDownSmallIcon from "@/ui/Icons/DropDownSmallIcon";
import {
  IconButton,
  MenuItem,
  Select,
  Typography,
  styled
} from "@mui/material";
import Box from "@mui/material/Box";

export const FlagItem = styled(Box)`
  display: flex;
  align-items: center;
  img {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    margin-right: 8px;
  }
  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 2;
    letter-spacing: -0.01em;
    color: rgba(236, 243, 255, 0.3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 30px;
  }
`;

export interface PhoneInputInterface {
  onDrpDownChange: (
    // event: SelectChangeEvent<unknown>,
    // child: ReactNode
    value: string
  ) => void;
  onInputValueChange: (value: string) => void;
  drpDownValue: string;
  inputValue: string;
  isError?: boolean;
  errMsg?: string;
}
export default function PhoneInputCustom({
  onDrpDownChange,
  onInputValueChange,
  drpDownValue,
  inputValue,
  isError,
  errMsg
}: PhoneInputInterface) {
  // const [value, setValue] = useState("");

  // const handelChange = (event: SelectChangeEvent | any) => {
  //   setValue(event.target.value);
  // };

  return (
    <InputFieldCommon
      type="number"
      className="joined_input"
      value={inputValue}
      onChange={(e) => {
        onInputValueChange(e.target.value);
      }}
      InputProps={{
        startAdornment: (
          <Select
            displayEmpty
            MenuProps={{ className: "flag_menu" }}
            inputProps={{ "aria-label": "Without label" }}
            // defaultValue={countries[0].code}
            // onChange={handelChange}
            // value={value}
            // onChange={onDrpDownChange}
            onChange={(e) => {
              onDrpDownChange(e.target.value);
            }}
            value={drpDownValue}
            IconComponent={(props) => (
              <IconButton {...props}>
                <DropDownSmallIcon />
              </IconButton>
            )}
          >
            <MenuItem value="" sx={{ display: "none !important" }}>
              <FlagItem>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${countries[0]?.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${countries[0]?.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                <Typography variant="caption">
                  +{countries[0]?.phone}
                </Typography>
              </FlagItem>
            </MenuItem>
            {countries?.map((option, index) => (
              <MenuItem value={option.phone} key={index} className="boxlblmenu">
                <FlagItem>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  <Typography variant="caption"> +{option?.phone}</Typography>
                </FlagItem>
              </MenuItem>
            ))}
          </Select>
        )
      }}
      errMsg={errMsg}
      error={isError}
    />
  );
}

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
interface CountryType2 {
  code: string;
  label: string;
  suggested?: boolean;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
export const countries: readonly CountryType[] = [
  {
    code: "US",
    label: "United States",
    phone: "1",
    suggested: true
  },
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971"
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268"
  },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true
  },
  { code: "AW", label: "Aruba", phone: "297" },
  { code: "AX", label: "Alland Islands", phone: "358" },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "387"
  },
  { code: "BB", label: "Barbados", phone: "1-246" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BE", label: "Belgium", phone: "32" },
  { code: "BF", label: "Burkina Faso", phone: "226" },
  { code: "BG", label: "Bulgaria", phone: "359" },
  { code: "BH", label: "Bahrain", phone: "973" },
  { code: "BI", label: "Burundi", phone: "257" },
  { code: "BJ", label: "Benin", phone: "229" },
  { code: "BL", label: "Saint Barthelemy", phone: "590" },
  { code: "BM", label: "Bermuda", phone: "1-441" },
  { code: "BN", label: "Brunei Darussalam", phone: "673" },
  { code: "BO", label: "Bolivia", phone: "591" },
  { code: "BR", label: "Brazil", phone: "55" },
  { code: "BS", label: "Bahamas", phone: "1-242" },
  { code: "BT", label: "Bhutan", phone: "975" },
  { code: "BV", label: "Bouvet Island", phone: "47" },
  { code: "BW", label: "Botswana", phone: "267" },
  { code: "BY", label: "Belarus", phone: "375" },
  { code: "BZ", label: "Belize", phone: "501" },
  {
    code: "CA",
    label: "Canada",
    phone: "1",
    suggested: true
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
    phone: "61"
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
    phone: "243"
  },
  {
    code: "CF",
    label: "Central African Republic",
    phone: "236"
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
    phone: "242"
  },
  { code: "CH", label: "Switzerland", phone: "41" },
  { code: "CI", label: "Cote d'Ivoire", phone: "225" },
  { code: "CK", label: "Cook Islands", phone: "682" },
  { code: "CL", label: "Chile", phone: "56" },
  { code: "CM", label: "Cameroon", phone: "237" },
  { code: "CN", label: "China", phone: "86" },
  { code: "CO", label: "Colombia", phone: "57" },
  { code: "CR", label: "Costa Rica", phone: "506" },
  { code: "CU", label: "Cuba", phone: "53" },
  { code: "CV", label: "Cape Verde", phone: "238" },
  { code: "CW", label: "Curacao", phone: "599" },
  { code: "CX", label: "Christmas Island", phone: "61" },
  { code: "CY", label: "Cyprus", phone: "357" },
  { code: "CZ", label: "Czech Republic", phone: "420" },
  {
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true
  },
  { code: "DJ", label: "Djibouti", phone: "253" },
  { code: "DK", label: "Denmark", phone: "45" },
  { code: "DM", label: "Dominica", phone: "1-767" },
  {
    code: "DO",
    label: "Dominican Republic",
    phone: "1-809"
  },
  { code: "DZ", label: "Algeria", phone: "213" },
  { code: "EC", label: "Ecuador", phone: "593" },
  { code: "EE", label: "Estonia", phone: "372" },
  { code: "EG", label: "Egypt", phone: "20" },
  { code: "EH", label: "Western Sahara", phone: "212" },
  { code: "ER", label: "Eritrea", phone: "291" },
  { code: "ES", label: "Spain", phone: "34" },
  { code: "ET", label: "Ethiopia", phone: "251" },
  { code: "FI", label: "Finland", phone: "358" },
  { code: "FJ", label: "Fiji", phone: "679" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
    phone: "500"
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
    phone: "691"
  },
  { code: "FO", label: "Faroe Islands", phone: "298" },
  {
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true
  },
  { code: "GA", label: "Gabon", phone: "241" },
  { code: "GB", label: "United Kingdom", phone: "44" },
  { code: "GD", label: "Grenada", phone: "1-473" },
  { code: "GE", label: "Georgia", phone: "995" },
  { code: "GF", label: "French Guiana", phone: "594" },
  { code: "GG", label: "Guernsey", phone: "44" },
  { code: "GH", label: "Ghana", phone: "233" },
  { code: "GI", label: "Gibraltar", phone: "350" },
  { code: "GL", label: "Greenland", phone: "299" },
  { code: "GM", label: "Gambia", phone: "220" },
  { code: "GN", label: "Guinea", phone: "224" },
  { code: "GP", label: "Guadeloupe", phone: "590" },
  { code: "GQ", label: "Equatorial Guinea", phone: "240" },
  { code: "GR", label: "Greece", phone: "30" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500"
  },
  { code: "GT", label: "Guatemala", phone: "502" },
  { code: "GU", label: "Guam", phone: "1-671" },
  { code: "GW", label: "Guinea-Bissau", phone: "245" },
  { code: "GY", label: "Guyana", phone: "592" },
  { code: "HK", label: "Hong Kong", phone: "852" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    phone: "672"
  },
  { code: "HN", label: "Honduras", phone: "504" },
  { code: "HR", label: "Croatia", phone: "385" },
  { code: "HT", label: "Haiti", phone: "509" },
  { code: "HU", label: "Hungary", phone: "36" },
  { code: "ID", label: "Indonesia", phone: "62" },
  { code: "IE", label: "Ireland", phone: "353" },
  { code: "IL", label: "Israel", phone: "972" },
  { code: "IM", label: "Isle of Man", phone: "44" },
  { code: "IN", label: "India", phone: "91" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    phone: "246"
  },
  { code: "IQ", label: "Iraq", phone: "964" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    phone: "98"
  },
  { code: "IS", label: "Iceland", phone: "354" },
  { code: "IT", label: "Italy", phone: "39" },
  { code: "JE", label: "Jersey", phone: "44" },
  { code: "JM", label: "Jamaica", phone: "1-876" },
  { code: "JO", label: "Jordan", phone: "962" },
  {
    code: "JP",
    label: "Japan",
    phone: "81",
    suggested: true
  },
  { code: "KE", label: "Kenya", phone: "254" },
  { code: "KG", label: "Kyrgyzstan", phone: "996" },
  { code: "KH", label: "Cambodia", phone: "855" },
  { code: "KI", label: "Kiribati", phone: "686" },
  { code: "KM", label: "Comoros", phone: "269" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    phone: "1-869"
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    phone: "850"
  },
  { code: "KR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", label: "Kuwait", phone: "965" },
  { code: "KY", label: "Cayman Islands", phone: "1-345" },
  { code: "KZ", label: "Kazakhstan", phone: "7" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
    phone: "856"
  },
  { code: "LB", label: "Lebanon", phone: "961" },
  { code: "LC", label: "Saint Lucia", phone: "1-758" },
  { code: "LI", label: "Liechtenstein", phone: "423" },
  { code: "LK", label: "Sri Lanka", phone: "94" },
  { code: "LR", label: "Liberia", phone: "231" },
  { code: "LS", label: "Lesotho", phone: "266" },
  { code: "LT", label: "Lithuania", phone: "370" },
  { code: "LU", label: "Luxembourg", phone: "352" },
  { code: "LV", label: "Latvia", phone: "371" },
  { code: "LY", label: "Libya", phone: "218" },
  { code: "MA", label: "Morocco", phone: "212" },
  { code: "MC", label: "Monaco", phone: "377" },
  {
    code: "MD",
    label: "Moldova, Republic of",
    phone: "373"
  },
  { code: "ME", label: "Montenegro", phone: "382" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
    phone: "590"
  },
  { code: "MG", label: "Madagascar", phone: "261" },
  { code: "MH", label: "Marshall Islands", phone: "692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389"
  },
  { code: "ML", label: "Mali", phone: "223" },
  { code: "MM", label: "Myanmar", phone: "95" },
  { code: "MN", label: "Mongolia", phone: "976" },
  { code: "MO", label: "Macao", phone: "853" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    phone: "1-670"
  },
  { code: "MQ", label: "Martinique", phone: "596" },
  { code: "MR", label: "Mauritania", phone: "222" },
  { code: "MS", label: "Montserrat", phone: "1-664" },
  { code: "MT", label: "Malta", phone: "356" },
  { code: "MU", label: "Mauritius", phone: "230" },
  { code: "MV", label: "Maldives", phone: "960" },
  { code: "MW", label: "Malawi", phone: "265" },
  { code: "MX", label: "Mexico", phone: "52" },
  { code: "MY", label: "Malaysia", phone: "60" },
  { code: "MZ", label: "Mozambique", phone: "258" },
  { code: "NA", label: "Namibia", phone: "264" },
  { code: "NC", label: "New Caledonia", phone: "687" },
  { code: "NE", label: "Niger", phone: "227" },
  { code: "NF", label: "Norfolk Island", phone: "672" },
  { code: "NG", label: "Nigeria", phone: "234" },
  { code: "NI", label: "Nicaragua", phone: "505" },
  { code: "NL", label: "Netherlands", phone: "31" },
  { code: "NO", label: "Norway", phone: "47" },
  { code: "NP", label: "Nepal", phone: "977" },
  { code: "NR", label: "Nauru", phone: "674" },
  { code: "NU", label: "Niue", phone: "683" },
  { code: "NZ", label: "New Zealand", phone: "64" },
  { code: "OM", label: "Oman", phone: "968" },
  { code: "PA", label: "Panama", phone: "507" },
  { code: "PE", label: "Peru", phone: "51" },
  { code: "PF", label: "French Polynesia", phone: "689" },
  { code: "PG", label: "Papua New Guinea", phone: "675" },
  { code: "PH", label: "Philippines", phone: "63" },
  { code: "PK", label: "Pakistan", phone: "92" },
  { code: "PL", label: "Poland", phone: "48" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    phone: "508"
  },
  { code: "PN", label: "Pitcairn", phone: "870" },
  { code: "PR", label: "Puerto Rico", phone: "1" },
  {
    code: "PS",
    label: "Palestine, State of",
    phone: "970"
  },
  { code: "PT", label: "Portugal", phone: "351" },
  { code: "PW", label: "Palau", phone: "680" },
  { code: "PY", label: "Paraguay", phone: "595" },
  { code: "QA", label: "Qatar", phone: "974" },
  { code: "RE", label: "Reunion", phone: "262" },
  { code: "RO", label: "Romania", phone: "40" },
  { code: "RS", label: "Serbia", phone: "381" },
  { code: "RU", label: "Russian Federation", phone: "7" },
  { code: "RW", label: "Rwanda", phone: "250" },
  { code: "SA", label: "Saudi Arabia", phone: "966" },
  { code: "SB", label: "Solomon Islands", phone: "677" },
  { code: "SC", label: "Seychelles", phone: "248" },
  { code: "SD", label: "Sudan", phone: "249" },
  { code: "SE", label: "Sweden", phone: "46" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "SH", label: "Saint Helena", phone: "290" },
  { code: "SI", label: "Slovenia", phone: "386" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
    phone: "47"
  },
  { code: "SK", label: "Slovakia", phone: "421" },
  { code: "SL", label: "Sierra Leone", phone: "232" },
  { code: "SM", label: "San Marino", phone: "378" },
  { code: "SN", label: "Senegal", phone: "221" },
  { code: "SO", label: "Somalia", phone: "252" },
  { code: "SR", label: "Suriname", phone: "597" },
  { code: "SS", label: "South Sudan", phone: "211" },
  {
    code: "ST",
    label: "Sao Tome and Principe",
    phone: "239"
  },
  { code: "SV", label: "El Salvador", phone: "503" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
    phone: "1-721"
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
    phone: "963"
  },
  { code: "SZ", label: "Swaziland", phone: "268" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    phone: "1-649"
  },
  { code: "TD", label: "Chad", phone: "235" },
  {
    code: "TF",
    label: "French Southern Territories",
    phone: "262"
  },
  { code: "TG", label: "Togo", phone: "228" },
  { code: "TH", label: "Thailand", phone: "66" },
  { code: "TJ", label: "Tajikistan", phone: "992" },
  { code: "TK", label: "Tokelau", phone: "690" },
  { code: "TL", label: "Timor-Leste", phone: "670" },
  { code: "TM", label: "Turkmenistan", phone: "993" },
  { code: "TN", label: "Tunisia", phone: "216" },
  { code: "TO", label: "Tonga", phone: "676" },
  { code: "TR", label: "Turkey", phone: "90" },
  {
    code: "TT",
    label: "Trinidad and Tobago",
    phone: "1-868"
  },
  { code: "TV", label: "Tuvalu", phone: "688" },
  {
    code: "TW",
    label: "Taiwan, Republic of China",
    phone: "886"
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
    phone: "255"
  },
  { code: "UA", label: "Ukraine", phone: "380" },
  { code: "UG", label: "Uganda", phone: "256" },

  { code: "UY", label: "Uruguay", phone: "598" },
  { code: "UZ", label: "Uzbekistan", phone: "998" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "379"
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784"
  },
  { code: "VE", label: "Venezuela", phone: "58" },
  {
    code: "VG",
    label: "British Virgin Islands",
    phone: "1-284"
  },
  {
    code: "VI",
    label: "US Virgin Islands",
    phone: "1-340"
  },
  { code: "VN", label: "Vietnam", phone: "84" },
  { code: "VU", label: "Vanuatu", phone: "678" },
  { code: "WF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", label: "Samoa", phone: "685" },
  { code: "XK", label: "Kosovo", phone: "383" },
  { code: "YE", label: "Yemen", phone: "967" },
  { code: "YT", label: "Mayotte", phone: "262" },
  { code: "ZA", label: "South Africa", phone: "27" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" }
];
export const countries2: readonly CountryType2[] = [
  {
    code: "US",
    label: "United States",
    suggested: true
  },
  { code: "AD", label: "Andorra" },
  {
    code: "AE",
    label: "United Arab Emirates"
  },
  { code: "AF", label: "Afghanistan" },
  {
    code: "AG",
    label: "Antigua and Barbuda"
  },
  { code: "AI", label: "Anguilla" },
  { code: "AL", label: "Albania" },
  { code: "AM", label: "Armenia" },
  { code: "AO", label: "Angola" },
  { code: "AQ", label: "Antarctica" },
  { code: "AR", label: "Argentina" },
  { code: "AS", label: "American Samoa" },
  { code: "AT", label: "Austria" },
  {
    code: "AU",
    label: "Australia",

    suggested: true
  },
  { code: "AW", label: "Aruba" },
  { code: "AX", label: "Alland Islands" },
  { code: "AZ", label: "Azerbaijan" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina"
  },
  { code: "BB", label: "Barbados" },
  { code: "BD", label: "Bangladesh" },
  { code: "BE", label: "Belgium" },
  { code: "BF", label: "Burkina Faso" },
  { code: "BG", label: "Bulgaria" },
  { code: "BH", label: "Bahrain" },
  { code: "BI", label: "Burundi" },
  { code: "BJ", label: "Benin" },
  { code: "BL", label: "Saint Barthelemy" },
  { code: "BM", label: "Bermuda" },
  { code: "BN", label: "Brunei Darussalam" },
  { code: "BO", label: "Bolivia" },
  { code: "BR", label: "Brazil" },
  { code: "BS", label: "Bahamas" },
  { code: "BT", label: "Bhutan" },
  { code: "BV", label: "Bouvet Island" },
  { code: "BW", label: "Botswana" },
  { code: "BY", label: "Belarus" },
  { code: "BZ", label: "Belize" },
  {
    code: "CA",
    label: "Canada",
    suggested: true
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands"
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the"
  },
  {
    code: "CF",
    label: "Central African Republic"
  },
  {
    code: "CG",
    label: "Congo, Republic of the"
  },
  { code: "CH", label: "Switzerland" },
  { code: "CI", label: "Cote d'Ivoire" },
  { code: "CK", label: "Cook Islands" },
  { code: "CL", label: "Chile" },
  { code: "CM", label: "Cameroon" },
  { code: "CN", label: "China" },
  { code: "CO", label: "Colombia" },
  { code: "CR", label: "Costa Rica" },
  { code: "CU", label: "Cuba" },
  { code: "CV", label: "Cape Verde" },
  { code: "CW", label: "Curacao" },
  { code: "CX", label: "Christmas Island" },
  { code: "CY", label: "Cyprus" },
  { code: "CZ", label: "Czech Republic" },
  {
    code: "DE",
    label: "Germany",

    suggested: true
  },
  { code: "DJ", label: "Djibouti" },
  { code: "DK", label: "Denmark" },
  { code: "DM", label: "Dominica" },
  {
    code: "DO",
    label: "Dominican Republic"
  },
  { code: "DZ", label: "Algeria" },
  { code: "EC", label: "Ecuador" },
  { code: "EE", label: "Estonia" },
  { code: "EG", label: "Egypt" },
  { code: "EH", label: "Western Sahara" },
  { code: "ER", label: "Eritrea" },
  { code: "ES", label: "Spain" },
  { code: "ET", label: "Ethiopia" },
  { code: "FI", label: "Finland" },
  { code: "FJ", label: "Fiji" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)"
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of"
  },
  { code: "FO", label: "Faroe Islands" },
  {
    code: "FR",
    label: "France",

    suggested: true
  },
  { code: "GA", label: "Gabon" },
  { code: "GB", label: "United Kingdom" },
  { code: "GD", label: "Grenada" },
  { code: "GE", label: "Georgia" },
  { code: "GF", label: "French Guiana" },
  { code: "GG", label: "Guernsey" },
  { code: "GH", label: "Ghana" },
  { code: "GI", label: "Gibraltar" },
  { code: "GL", label: "Greenland" },
  { code: "GM", label: "Gambia" },
  { code: "GN", label: "Guinea" },
  { code: "GP", label: "Guadeloupe" },
  { code: "GQ", label: "Equatorial Guinea" },
  { code: "GR", label: "Greece" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands"
  },
  { code: "GT", label: "Guatemala" },
  { code: "GU", label: "Guam" },
  { code: "GW", label: "Guinea-Bissau" },
  { code: "GY", label: "Guyana" },
  { code: "HK", label: "Hong Kong" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands"
  },
  { code: "HN", label: "Honduras" },
  { code: "HR", label: "Croatia" },
  { code: "HT", label: "Haiti" },
  { code: "HU", label: "Hungary" },
  { code: "ID", label: "Indonesia" },
  { code: "IE", label: "Ireland" },
  { code: "IL", label: "Israel" },
  { code: "IM", label: "Isle of Man" },
  { code: "IN", label: "India" },
  {
    code: "IO",
    label: "British Indian Ocean Territory"
  },
  { code: "IQ", label: "Iraq" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of"
  },
  { code: "IS", label: "Iceland" },
  { code: "IT", label: "Italy" },
  { code: "JE", label: "Jersey" },
  { code: "JM", label: "Jamaica" },
  { code: "JO", label: "Jordan" },
  {
    code: "JP",
    label: "Japan",

    suggested: true
  },
  { code: "KE", label: "Kenya" },
  { code: "KG", label: "Kyrgyzstan" },
  { code: "KH", label: "Cambodia" },
  { code: "KI", label: "Kiribati" },
  { code: "KM", label: "Comoros" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis"
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of"
  },
  { code: "KR", label: "Korea, Republic of" },
  { code: "KW", label: "Kuwait" },
  { code: "KY", label: "Cayman Islands" },
  { code: "KZ", label: "Kazakhstan" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic"
  },
  { code: "LB", label: "Lebanon" },
  { code: "LC", label: "Saint Lucia" },
  { code: "LI", label: "Liechtenstein" },
  { code: "LK", label: "Sri Lanka" },
  { code: "LR", label: "Liberia" },
  { code: "LS", label: "Lesotho" },
  { code: "LT", label: "Lithuania" },
  { code: "LU", label: "Luxembourg" },
  { code: "LV", label: "Latvia" },
  { code: "LY", label: "Libya" },
  { code: "MA", label: "Morocco" },
  { code: "MC", label: "Monaco" },
  {
    code: "MD",
    label: "Moldova, Republic of"
  },
  { code: "ME", label: "Montenegro" },
  {
    code: "MF",
    label: "Saint Martin (French part)"
  },
  { code: "MG", label: "Madagascar" },
  { code: "MH", label: "Marshall Islands" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of"
  },
  { code: "ML", label: "Mali" },
  { code: "MM", label: "Myanmar" },
  { code: "MN", label: "Mongolia" },
  { code: "MO", label: "Macao" },
  {
    code: "MP",
    label: "Northern Mariana Islands"
  },
  { code: "MQ", label: "Martinique" },
  { code: "MR", label: "Mauritania" },
  { code: "MS", label: "Montserrat" },
  { code: "MT", label: "Malta" },
  { code: "MU", label: "Mauritius" },
  { code: "MV", label: "Maldives" },
  { code: "MW", label: "Malawi" },
  { code: "MX", label: "Mexico" },
  { code: "MY", label: "Malaysia" },
  { code: "MZ", label: "Mozambique" },
  { code: "NA", label: "Namibia" },
  { code: "NC", label: "New Caledonia" },
  { code: "NE", label: "Niger" },
  { code: "NF", label: "Norfolk Island" },
  { code: "NG", label: "Nigeria" },
  { code: "NI", label: "Nicaragua" },
  { code: "NL", label: "Netherlands" },
  { code: "NO", label: "Norway" },
  { code: "NP", label: "Nepal" },
  { code: "NR", label: "Nauru" },
  { code: "NU", label: "Niue" },
  { code: "NZ", label: "New Zealand" },
  { code: "OM", label: "Oman" },
  { code: "PA", label: "Panama" },
  { code: "PE", label: "Peru" },
  { code: "PF", label: "French Polynesia" },
  { code: "PG", label: "Papua New Guinea" },
  { code: "PH", label: "Philippines" },
  { code: "PK", label: "Pakistan" },
  { code: "PL", label: "Poland" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon"
  },
  { code: "PN", label: "Pitcairn" },
  { code: "PR", label: "Puerto Rico" },
  {
    code: "PS",
    label: "Palestine, State of"
  },
  { code: "PT", label: "Portugal" },
  { code: "PW", label: "Palau" },
  { code: "PY", label: "Paraguay" },
  { code: "QA", label: "Qatar" },
  { code: "RE", label: "Reunion" },
  { code: "RO", label: "Romania" },
  { code: "RS", label: "Serbia" },
  { code: "RU", label: "Russian Federation" },
  { code: "RW", label: "Rwanda" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "SB", label: "Solomon Islands" },
  { code: "SC", label: "Seychelles" },
  { code: "SD", label: "Sudan" },
  { code: "SE", label: "Sweden" },
  { code: "SG", label: "Singapore" },
  { code: "SH", label: "Saint Helena" },
  { code: "SI", label: "Slovenia" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen"
  },
  { code: "SK", label: "Slovakia" },
  { code: "SL", label: "Sierra Leone" },
  { code: "SM", label: "San Marino" },
  { code: "SN", label: "Senegal" },
  { code: "SO", label: "Somalia" },
  { code: "SR", label: "Suriname" },
  { code: "SS", label: "South Sudan" },
  {
    code: "ST",
    label: "Sao Tome and Principe"
  },
  { code: "SV", label: "El Salvador" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)"
  },
  {
    code: "SY",
    label: "Syrian Arab Republic"
  },
  { code: "SZ", label: "Swaziland" },
  {
    code: "TC",
    label: "Turks and Caicos Islands"
  },
  { code: "TD", label: "Chad" },
  {
    code: "TF",
    label: "French Southern Territories"
  },
  { code: "TG", label: "Togo" },
  { code: "TH", label: "Thailand" },
  { code: "TJ", label: "Tajikistan" },
  { code: "TK", label: "Tokelau" },
  { code: "TL", label: "Timor-Leste" },
  { code: "TM", label: "Turkmenistan" },
  { code: "TN", label: "Tunisia" },
  { code: "TO", label: "Tonga" },
  { code: "TR", label: "Turkey" },
  {
    code: "TT",
    label: "Trinidad and Tobago"
  },
  { code: "TV", label: "Tuvalu" },
  {
    code: "TW",
    label: "Taiwan, Republic of China"
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania"
  },
  { code: "UA", label: "Ukraine" },
  { code: "UG", label: "Uganda" },

  { code: "UY", label: "Uruguay" },
  { code: "UZ", label: "Uzbekistan" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)"
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines"
  },
  { code: "VE", label: "Venezuela" },
  {
    code: "VG",
    label: "British Virgin Islands"
  },
  {
    code: "VI",
    label: "US Virgin Islands"
  },
  { code: "VN", label: "Vietnam" },
  { code: "VU", label: "Vanuatu" },
  { code: "WF", label: "Wallis and Futuna" },
  { code: "WS", label: "Samoa" },
  { code: "XK", label: "Kosovo" },
  { code: "YE", label: "Yemen" },
  { code: "YT", label: "Mayotte" },
  { code: "ZA", label: "South Africa" },
  { code: "ZM", label: "Zambia" },
  { code: "ZW", label: "Zimbabwe" }
];

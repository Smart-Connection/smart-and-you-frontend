import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");


export const format_dddd_d_mmmm_YYYY = (data: string) => {
    const date = dayjs(data);
    const fullDay = capitalize(date.format("dddd"))
    const day = capitalize(date.format("DD"))
    const month = date.format("MMMM")
    const year = date.format("YYYY")
    return `${fullDay} ${day} ${month} ${year}`
}

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
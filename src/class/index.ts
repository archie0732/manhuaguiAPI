import { load } from "cheerio"
import { baseURL } from "../utils/const"
import logger from "../utils/logger"
import { ArchieMangaAPI } from "./manga.interfce"

export const fetchManga = async (id: string) => {
    const response = await fetch(baseURL(id))

    if(!response.ok){
        logger.error('fetch data fail!')
        throw new Error(`fetch manga detail fail, source web status: ${response.status}`)
    }

    logger.info('[ArchieManhuaguiAPI] fetch HTML success!!')    

    return new ArchieMangaAPI(await response.text(), id )
}

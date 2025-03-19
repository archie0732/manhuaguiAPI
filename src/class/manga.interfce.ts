import { load } from "cheerio";
import { baseURL, errorThumb } from "../utils/const";


interface Update {
    time: string
    chapter: string
    status: boolean
}

export class ArchieMangaAPI{

    title: string = ''
    id:string = ''
    url: string = ''
    thumb: string = ''
    author: string = ''
    update: Update = {
        time : '',
        chapter: '',
        status: true,
    } 
    tag: string = ''
    descruption: string = ''

    constructor(html:string, id: string){
        this.url = baseURL(id)
        this.id = id

        const $ = load(html)
        this.title = $('h1').text()
        this.thumb = $('.thumb').find('img').attr('src')?? errorThumb
        const status = $('.thumb').find('i').text()
        const chapter = $('dd').eq(0).text()
        const updateTime = $('dd').eq(1).text()
        this.author = $('dd').eq(2).text()
        this.tag = $('dd').eq(3).text()
        this.descruption = $('.book-intro').find('p').text()

        this.update = {
            chapter,
            status: status==='完結'?false : true,
            time: updateTime
        }
    }
}
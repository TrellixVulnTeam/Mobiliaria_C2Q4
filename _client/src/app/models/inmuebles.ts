export interface inmuebleI{
    type: string,
    city: string,
    sector: string,
    attr: {
        levels: number,
        rooms: number,
        baths: number,
        garage: number,
    },
    assesor: {
        name: string,
        email: string,
    },
    favs: number,
    comments: string,
    date: string,
    img:{
        img1:string,
        img2:string,
        img3:string,
        img4:string,
    },
    price:number
}
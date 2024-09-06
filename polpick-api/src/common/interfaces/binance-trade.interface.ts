export interface IBinanceTrade {
    e: string
    E: number
    s: string
    t: number
    p: string
    q: string
    b: number
    a: number
    T: number
    S: string
}

export interface IBinanceKLine {
    e: string
    E: number
    s: string
    k: IBinanceKLineData
}

interface IBinanceKLineData {
    t: number
    T: number
    s: string
    i: string
    F: number
    L: number
    o: string
    c: string
    h: string
    l: string
    v: string
    n: number
    x: boolean
    q: string
    V: string
    Q: string
}

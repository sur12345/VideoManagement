export interface TAG {
    tag_id: number,
    tag_name: string,
    show?: boolean
}

export type TAGLIST = TAG[]

export function get() {
    console.log(123)
}
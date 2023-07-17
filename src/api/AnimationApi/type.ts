//动画列表的数据类型
export interface ALLANIMATION {
    isMovie?: number,
    order?: string,
    page: string | number,
    limit: string | number,
    searchKey?: string,
    searchValue?: string
}

export interface DELETEANIMATIONTAG {
    animation_id: number,
    tag_id: number
}
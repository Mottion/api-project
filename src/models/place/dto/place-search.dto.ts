export class PlaceSearchDto {
  take: 5
  page?: number
  orderType: "asc" | "desc"
  orderBy?: string
  search?: string

  constructor(query: PlaceSearchDto){
    this.take = 5
    this.page = query.page ?? 1
    this.orderBy = query.orderBy ?? null
    this.orderType = query.orderType == "desc" ? "desc" : "asc"
    this.search = query.search ?? null
  }
}
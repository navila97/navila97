


export async function BatchAsync<ResultType>(
    n : number,
    f: (index?: number) => Promise<ResultType | void>,
    err : (index: number) => Promise<ResultType | void> = async()=>{}
) : Promise<ResultType[]>{

    let queue = []
    for(let i=1; i<=n; i++) queue.push(f(<any>i ).catch(e => err(i)))
    return (await Promise.all(queue)).filter( f => f != undefined)
}


export async function BatchSync<ResultType>(
    n : number,
    f: (index?: number) => Promise<ResultType | void>,
    err : (index: number) => Promise<ResultType | void> = async()=>{}
) : Promise<ResultType[]>{

    let queue = []
    for(let i=1; i<=n; i++) queue.push(await f(<any>i ).catch(e => err(i)))
    return (await Promise.all(queue)).filter( f => f != undefined)
}



export async function AsyncForEach<ItemType, ResultType>(
    items: ItemType[] ,
    f: (item: ItemType, index?: number) => Promise<ResultType | void>,
    err : (item: ItemType, index: number, e: Error) => Promise<ResultType | void> = async()=>{}
) : Promise<ResultType[]>{

    let queue = []
    items.map((item, index) => queue.push(f(item, index).catch(e => err(item, index, e))))
    return (await Promise.all(queue)).filter( f => f != undefined)
}



export async function SyncForEach<ItemType, ResultType>(
    items: ItemType[] ,
    f: (item: ItemType, index?: number) => Promise<ResultType | void>,
    err : (item: ItemType, index: number) => Promise<ResultType | void> = async()=>{}
) : Promise<ResultType[]>{

    let queue = []
    for(const [index, item] of Object.entries<ItemType>(items)){
        queue.push( await f(item, Number(index)).catch(e => err(item, Number(index)  ) ))
    }
    return (await Promise.all(queue)).filter( f => f != undefined)
}



export async function InfinitiLoop(
    f: ()=>Promise<any>,
    err: (e: Error)=>Promise<any> = async()=>{}
){
    while(true){
        try{
            if( await f() == true) break
        }catch(e){
            await err(e)
        }
    }
}


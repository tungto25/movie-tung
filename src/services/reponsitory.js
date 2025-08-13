export const getOjectById = (data,id) => {
    console.log(id);
    return data?.find(e => e.id == id) ;
}
function arrayMap(elements, func){
    return elements.reduce((acc, item) => [...acc, func(item)], [])
}

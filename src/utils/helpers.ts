const getMathLog = (value: number): number => {
    return ( 
        Math.round((Math.log10(value) + Number.EPSILON) * 100) / 100
    )
}

export { getMathLog }

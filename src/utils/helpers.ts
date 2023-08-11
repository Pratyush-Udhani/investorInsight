const getMathLog = (value: number): number => {
    return (
        value !== 0 ? 
            Math.round((Math.log10(value) + Number.EPSILON) * 100) / 100
       : 0 
    )
}

export { getMathLog }

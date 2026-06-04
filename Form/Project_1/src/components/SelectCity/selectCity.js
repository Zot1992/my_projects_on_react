const selectCityStyles = (error) => ({
    control: (styles) => ({
        ...styles,
        borderColor: error ? 'red !important' : '#ffffff',
        ':hover': {
            borderColor: error ? 'red !important' : '#ffffff',
        },
    })
})

export default selectCityStyles
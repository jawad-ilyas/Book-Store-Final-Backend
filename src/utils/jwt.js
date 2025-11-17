const generateToken = asyncHandler(async (id, email, role ) => {


    const accessToken = jwt.sign(
        {
            _id: id,
            email,
            role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    const refreshToken = jwt.sign(
        {
            _id: id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

    return { accessToken, refreshToken }



})




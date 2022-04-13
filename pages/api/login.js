import cookie from "cookie";

const handle = (req,res)=>{
    switch (req.method){
        case 'POST':
            const {username, password}=req.body
            if(username === process.env.ADMIN_USERNAME
            && password===process.env.ADMIN_PASSWORD){
                res.setHeader(
                    'Set-Cookie',
                    cookie.serialize('token', process.env.TOKEN, {
                        maxAge: 60 * 60,
                        sameSite: 'strict',
                        path: '/'
                    })
                );
                res.send(true)
            }else{
                res.send(false)
            }
            break
        default:
            break
    }

}
export default  handle


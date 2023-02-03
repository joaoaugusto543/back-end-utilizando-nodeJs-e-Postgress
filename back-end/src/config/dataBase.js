import 'dotenv/config'

const {Client}=require('pg')

const client=new Client({
    host:process.env.POSTGRESS_HOST,
    user:process.env.POSTGRESS_USER,
    port:process.env.POSTGRESS_PORT,
    password:process.env.POSTGRESS_PASSWORD,
    database:process.env.POSTGRESS_DATABASE
})

client.connect()

export const insert= async (id,name,age)=> {
    await client.query('INSERT INTO Cliente(id,name,age) VALUES ($1,$2,$3);',[id,name,age]);
}

export const showUser=async (id)=>{
    const resp=await client.query(`select * from Cliente where id=${id}`)
    return resp.rows
}

export const showUsers=async ()=>{
    const resp=await client.query('select * from Cliente')
    return resp.rows
}

export const updateUser=async(id,name,age)=>{
    await client.query(`update Cliente set name=$1 , age=$2 where id=${id}`,[name,age])
}

export const deleteUser=async(id)=>{
    await client.query(`delete from Cliente where id=${id}`)
}


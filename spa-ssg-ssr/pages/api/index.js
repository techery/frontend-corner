export default async function handler(req, res) {
    const data = await getUserData();
    res.status(200).json(data);
}

export async function getUserData(){
    return new Promise(
        (resolve) => setTimeout(() => resolve({name: 'Vasia', desc: 'Some desc'}), 1000)
    );
}
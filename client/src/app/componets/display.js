"use client"

export async function getdata() {
    var getdata_data = await fetch('http://localhost:1000/users/getdata',{cache:'no-store'});
        getdata_data = await getdata_data.json();
        return getdata_data.userId;
}

export async function Display_data() {

    let userdata = await getdata();
    console.log(userdata);
    
    const logout = async() =>{
        var logout_data = await fetch ('http://localhost:1000/api/auth/logout',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        logout_data=logout_data.json();
        console.log("Suceefully Log Out")
    }
 
    return (
        <section className=" dark:bg-gray-900 flex font-medium items-center justify-center h-screen">
            <section className="w-64 mx-auto dark:bg-gray-800 rounded-2xl px-8 py-6 shadow-lg">
                <div className="mt-6 w-fit mx-auto">
                    <img src="/logo_toForZero.png" className="rounded-full w-28 " alt="profile picture"  />
                </div>
                <p className="text-emerald-400 font-semibold mt-2 text-center" >
                    Active
                </p>
                <div className="mt-3 text-center ">
                    <h2 className="text-white font-bold text-xl tracking-wide">Jonathan Smith</h2>
                </div>
                <div className="my-3 text-center rounded-2xl">
                    <button 
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200" 
                    id="logoutBtn"
                    onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </section>
        </section>
    )
}
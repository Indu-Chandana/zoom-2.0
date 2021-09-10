import axios from "./axios";
import { useRouter } from 'next/router';

function Join({roomnames}) {

    const router = useRouter();

    const go = (_id) =>
    {
        router.push(`/${_id}`)
        // router.push('/' + _id);

        // meken id eka server eke console.log ekata gaththa
        // await axios.post('/meeting', {
        //     "id": _id
        // });

        // console.log(_id)

    }

    return (
        <div>
            {roomnames.map(roomname => (
                <div className=" flex justify-between w-52">
                    <p>{roomname.name}</p>
                    <button 
                    className="border border-gray-900 w-20"
                    onClick={() => go(roomname._id)}>Join</button>
                    {/* <button type="button" onclick="alert('Hello World!')">Click Me!</button> */}
                </div>
            ))}
        </div>
    )
}

export default Join

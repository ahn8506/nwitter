
import React, { useState } from "react";
import { authService, dbService } from "fbase";
import { updateProfile } from "@firebase/auth";
import { useHistory } from "react-router-dom";
import { getDocs, collection, query, orderBy, where } from "firebase/firestore";


export default ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    /*const getMyNweets = async () => {
        const docRef = collection(dbService, "nweets");
        const q = query(docRef, where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
        const nweets = await getDocs(q);
        console.log(nweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyNweets();
    }, []);
*/
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();

        if (userObj.displayName !== newDisplayName) {


            await updateProfile(userObj, {
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };
    return (
        <>
            <div className="container">
                <form onSubmit={onSubmit} className="profileForm">
                    <input
                        onChange={onChange}
                        type="text"
                        placeholder="Display name"
                        value={newDisplayName}
                    />
                    <input type="submit" value="Update Profile" />
                </form>
                <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                    Log Out
                </span>
            </div>
        </>
    );
};
"use client"

import UserView from "./userView"
import UpdateUserProvider, { UpdateUserContext } from "./userViewContext"

export default function UserViewMain () {
    return (
        <div>
            <UpdateUserProvider>
                <UserView user={{name:"hola",email:"caballeroo"}}/>
            </UpdateUserProvider>
        </div>
    )
}
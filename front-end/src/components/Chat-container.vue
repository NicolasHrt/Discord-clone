<template>
    <div class="bg-[#1e1f22] max-w-[280px] w-full">
        <div class="rounded-tl-lg bg-[#2b2d31]  min-h-[91vh] mb-3">
            <div class="mb-4 p-4 shadow-2xl  ">
                <h2 class="text-white font-bold">League of legends</h2>
            </div>
            <div class="text-gray-300 font-medium px-2 mb-8">
                <h2 class="mb-2 font-normal">Salons textuels </h2>
                <ul>
                    <li class="p-2 hover:bg-[#404249] hover:text-white rounded-xl cursor-pointer mb-2 transition"># Salon
                        general</li>
                    <li class="p-2 bg-[#404249] text-white rounded-xl cursor-pointer mb-2 transition"># Gaming 🎮</li>

                    <li class="p-2 hover:bg-[#404249] hover:text-white rounded-xl cursor-pointer mb-2 transition"># Commande
                        bot 🤖
                    </li>

                </ul>
            </div>
            <div class="text-gray-300 font-medium px-2">
                <h2 class="mb-2 font-normal">Salons vocaux </h2>
                <ul>
                    <li class="  rounded-xl cursor-pointer ">
                        <div class=" flex gap-2 hover:bg-[#404249] hover:text-white rounded-xl transition p-2">
                            <img src="../assets/icons8-speaker-24.png" alt="">
                            Blabla
                        </div>
                        <ul class="pl-4 mt-2 ">
                            <li class="flex gap-2 items-center mb-2"> <img class="w-8 h-8 rounded-full"
                                    src="https://api.dicebear.com/6.x/fun-emoji/svg?seed=DataDragon" alt="">
                                DataDragon</li>
                            <li class="flex gap-2 items-center"> <img class="w-8 h-8 rounded-full"
                                    src="https://api.dicebear.com/6.x/fun-emoji/svg?seed=SunnyDaze" alt="">
                                SunnyDaze</li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
        <div class="flex gap-2">
            <div class="relative">
                <div class="bg-[#313338]  w-14 h-14 rounded-full overflow-hidden  ">
                    <img class="w-full h-full object-cover" :src="profilePic" alt="">
                </div>
                <div class="bg-green-600 w-4 h-4 border-2 border-[#313338] rounded-full bottom-0 right-0 absolute">

                </div>
            </div>

            <div>
                <p class="text-white text-lg font-medium">{{ userId }}</p>
                <p class="text-gray-400">Online</p>
            </div>
        </div>
    </div>
    <div class=" bg-[#313338]  w-full min-h-screen ">
        <div class="mb-4 p-4 shadow-2xl  ">
            <h2 class="text-white font-bold">Gaming 🎮</h2>
        </div>
        <div class="px-4">
            <div id="chat-container" ref="chatContainer"
                class="min-h-[790px] max-h-[790px] overflow-y-scroll mb-2 relative">
                <div v-if="messages.length == 0"
                    class="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-gray-500 font-medium text-xl">
                    Pas de message pour l'instant... </div>
                <div v-for="message in messages" class="flex gap-4 mb-5 ">
                    <div class="relative w-14 h-14">
                        <div class="bg-[#313338]  w-14 h-14 rounded-full overflow-hidden  ">
                            <img class="w-full h-full object-cover" :src="message.profilePic" alt="">
                        </div>

                    </div>
                    <div>
                        <div class="flex gap-4 items-end">
                            <p class="text-lg font-medium" :class="message.colorProfile">{{ message.userId
                            }}</p>
                            <p class="text-gray-500"> {{ message.date }} : {{ message.time }}</p>
                        </div>
                        <div class="text-white ">
                            <p>{{ message.message }}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div class="flex gap-4 items-center">
                <input v-model="currentMessage"
                    class="bg-[#383a40] w-full rounded-md p-4 text-lg text-white font-medium outline-none"
                    placeholder="Envoyer un message dans le salon" type="text" name="" id="">
                <button @click="sendMessage()"
                    class="bg-[#5865f2] text-white font-bold px-2 py-3 rounded-lg">Envoyer</button>
            </div>

        </div>
    </div>
    <div class="bg-[#2b2d31] max-w-[300px] w-full ">
        <div class="p-4 max-h-screen overflow-y-scroll">
            <div class="mb-5">
                <h2 class="font-medium text-xl  text-gray-400">En ligne - {{ users.length }}</h2>
            </div>
            <TransitionGroup name="onlineList" tag="div">
                <div v-for="user in users" class="flex gap-4 mb-5 items-center userEntering">
                    <div class="relative w-14 h-14">
                        <div class="bg-[#313338]  w-14 h-14 rounded-full overflow-hidden  ">
                            <img class="w-full h-full object-cover" :src="user.img" alt="">
                        </div>
                        <div class="bg-green-600 w-4 h-4 border-2 border-[#313338] rounded-full bottom-0 right-0 absolute">
                        </div>
                    </div>

                    <div class="text-lg font-medium " :class="user.color">
                        {{ user.name }}

                    </div>


                </div>
            </TransitionGroup>
        </div>


    </div>
</template>



<script>
import io from "socket.io-client";
// const socket = io("http://localhost:3000");
const socket = io("https://discord-clone-44d5.onrender.com/");
const colors = [
    "text-blue-400",
    "text-indigo-400",
    "text-purple-400",
    "text-pink-400",
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-green-400",
    "text-teal-400",
    "text-cyan-400",
    "text-amber-400",
    "text-lime-400",
    "text-emerald-400",
    "text-sky-400",
    "text-fuchsia-400",
    "text-rose-400",

];


export default {
    data() {
        return {
            currentMessage: "",
            messages: [],
            userId: "",
            colorProfile: "",
            users: [],
            profilePic: "",


        };
    },
    methods: {
        sendMessage() {
            if (this.currentMessage === "") return;
            // Obtenir la date actuelle
            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Les mois commencent à 0
            const year = currentDate.getFullYear();

            // Obtenir l'heure actuelle
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();

            // Formater la date et l'heure
            const formattedDate = `${day}/${month}/${year}`;
            const formattedTime = `${hours}:${minutes}`;

            const dataToSend = {
                message: this.currentMessage,
                userId: this.userId,
                colorProfile: this.colorProfile,
                profilePic: this.profilePic,
                date: formattedDate, // Ajouter la date
                time: formattedTime, // Ajouter l'heure
            };
            socket.emit("message", dataToSend);
            this.currentMessage = "";


        },

    },
    mounted() {
        socket.on("userConnected", userInfo => {

            const currentUserInfo = userInfo.find(user => user.id === socket.id);
            this.colorProfile = currentUserInfo.color;
            this.profilePic = currentUserInfo.img;
            this.userId = currentUserInfo.name;

            this.users = userInfo;
   
        }
        );



        socket.on("userDisconnected", userInfo => {
            console.log(userInfo);
            this.users = userInfo;
        }
        );


        socket.on("message", message => {
            this.messages.push(message);
            this.$nextTick(() => {
                this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
            });
        });
    }
}

</script>
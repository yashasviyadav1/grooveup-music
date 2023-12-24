import React, { useContext } from 'react';
import {useState} from 'react';
import spotify_logo from '../assets/images/spotify_logo_white.svg'
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../components/shared/TextWithHover';
import {Howl, Howler} from 'howler';
import songContext from '../contexts/songContext';

/* ⭐imp note : so basically this file contains all the raw code for 'sideBar' 'navbar' and bottom 'songBar' which
                is used as it is again and again in different routes like '/home' '/mySongs' '/search' etc so we want that we do not render these same things again and again
                so for this what we want is that we are writing this code here and whenever we want 'sidebar,navbar,songBar' in our page we will call this 'LoggedInContainer' Compoent
                
    imp note 2 : here if u check that in every page basically only the right mid content is always changed, rest is same so we will write 
                {children} and pass children as a prop in this page so that whever we call this 'LoggedInContainer' component, inside it we write the right mid part code only
                eg. 
                <LoggedInContainer>
                    <div>This is the right mid content </div>
                </LoggedInContainer> 

                in react this 'children' keyword is used for this purpose only so that the repeated code is not written again and again and only the non repeating code is 
                writen as the child of the 'LoggedInContainer' here (for fast rendering)
*/



export default function LoggedInContainer({children}){

    const [soundPlayed, setSoundPlayed] = useState(null); // this state stores the current song playing
    const [isPaused, setIsPaused] = useState(true); // state to store if curr song is played or paused rn, initially song is paused

    // get the global values of currentSong and setCurrentSong from 'songContext' via 'getContext' hook
    const {currentSong, setCurrentSong} = useContext(songContext); // this currentSong will have value of obj 'info' of song which is global
    
    // this play sound func we will use in the song play bar at the bottom of home page (10%)
    const playSound = (songSrc) => { 

        if(soundPlayed){  // if a song is alrady playing then stop it first
            soundPlayed.stop();
        }
        
        let sound = new Howl({ 
            src: [songSrc], // get the src of song that user wants to play now
            html5: true
        });

        setSoundPlayed(sound); // update soundPlayed with the current song 
        sound.play();
    }

    // this func will pause the curr sound
    const pauseSound = () => {
        soundPlayed.stop();
    }

    // this func will togle the sound -> if its being played then this func stops it, if it is stoped then this func playes it
    const togglePlayPause = () => {
        if(isPaused){ 
            playSound(currentSong.track); // call the above playSound Func
            setIsPaused(false); // update isPaused varaible
        }
        else{
            pauseSound(); // call the above pause sound func
            setIsPaused(true);// update isPaused varaible
        }
    }

    return(
        <div className='h-full w-full bg-app-black'>
        
            {/*[content from top navbar to bottom (Excluding songBar)] this will be the upper 90% screen (without song play bar) */}
            <div className={`${currentSong?("h-9/10"):("h-full")} w-full flex `}> {/* when a curr song is null means no song played by user then we this screen will be full (no song bar at bottom), if not null then this screen will take height of 90% of screnn and rest 10%is for songBar*/}

                {/* this will be the left pannel */}
                <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-7'>
                    <div>
                        <div className='logoDiv p-5' >
                            <img src={spotify_logo} alt="spotify logo" width={125} />
                        </div>
                        <div className='py-5'>
                            <IconText iconName={"material-symbols:home"} displayText={"Home"} active/>
                            <IconText iconName={"uil:search"} displayText={"Search"} />
                            <IconText iconName={"clarity:library-solid"} displayText={"Library"} />
                            <IconText iconName={"bxs:music"} displayText={"My Music"} />
                        </div>

                        <div className='pt-5'>
                            <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} />
                            <IconText iconName={"mdi:heart"} displayText={"Liked Songs"} />
                        </div>

                    </div>

                    <div className='px-6 '>
                        <div className='border border-gray-400 text-white flex w-2/5 rounded-full flex justify-center items-center py-1 cursor-pointer hover:border-white'>
                            <Icon icon="humbleicons:globe" fontSize={18} />
                            <div className='ml-1 text-sm font-semibold'>English</div>
                        </div>
                    </div>
                    
                </div>

                {/* this will be the right pannel */}
                <div className='h-full w-4/5 bg-app-black'>
                        
                    {/* in the right pannel this will be Navbar  */}
                    <div className='navbar h-1/10 w-full bg-black bg-opacity-40 flex items-center justify-end'>
                        
                        <div className='h-full w-1/2 flex items-center'>
                            <div className='h-full w-3/5 flex items-center justify-around '>
                                <TextWithHover displayText={"Premium"}/>
                                <TextWithHover displayText={"Support"}/>
                                <TextWithHover displayText={"Download"}/>
                                <div className='h-1/2 border border-gray-500'></div>
                            </div>
                            <div className='h-full w-2/5 flex items-center justify-around '>
                                <TextWithHover displayText={"Upload Song"}/>
                                <div className='h-10 w-10 py-4 px-4 bg-white flex justify-center items-center rounded-full font-semibold cursor-pointer hover:bg-gray-200'>
                                    YY
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* this will be content below navbar */}
                    <div className='content h-9/10 p-8 pt-0 text-white overflow-auto'>
                        {/* this below code is non repeating code sent from whever this 'LoggedInComponent' is called */}
                        {children} 
                    </div>
                    
                </div>
            </div>

            {/* song play/pause bar*/}
            {
                // conditionally rendering i.e when value of currentSOng is not null, then only this screen should be rendered 
                currentSong && (
            
                <div className='h-1/10 w-full bg-black bg-opacity-30 flex items-center '>

                    {/* this will be left part of song play bar */}
                    <div className='w-1/4 h-full flex items-center p-4' >
                        <img 
                            // src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Metro_Boomin_-_Heroes_%26_Villains.png/220px-Metro_Boomin_-_Heroes_%26_Villains.png"
                            src={currentSong.thumbnail} // set currentSongs thumbnail as the bottom song bar thumbnail
                            className='h-11 w-11 rounded '
                            alt="art cover"
                        />
                        <div className='pl-4'>
                            <div className='text-white text-sm text-left cursor-pointer hover:underline max-w-max'>
                                {currentSong.name} 
                            </div>
                            <div className='text-gray-400 text-xs text-left cursor-pointer hover:underline max-w-max'>
                                {currentSong.artist.firstName + " " + currentSong.artist.lastName} {/*because currentSong.artist is an object with all info of artist that fetched did with .populate() function in backend*/}
                            </div>
                        </div>
                    </div>

                    {/* this will me middle part of song play bar */}
                    <div className='w-2/4 h-full flex justify-center flex-col items-center '>

                        <div className='w-1/3 flex justify-center items-center justify-between  h-full'>
                            {/* song play,pause,repeat etc, controls */}
                            <Icon 
                                icon="mi:shuffle" 
                                fontSize={20}  
                                className='text-gray-400 cursor-pointer hover:color-white hover:text-white'
                            />
                            <Icon 
                                icon="fluent:previous-32-filled" 
                                fontSize={20} 
                                className='text-gray-400 cursor-pointer hover:text-white' 
                            />
                            <Icon  /* Play/Pause icon*/
                                icon={isPaused?"carbon:play-outline":"carbon:pause-outline"} 
                                fontSize={35} 
                                className='text-gray-400 cursor-pointer hover:text-white'
                                onClick={
                                    ()=>{togglePlayPause()}
                                }
                            />
                            <Icon 
                                icon="fluent:next-32-filled" 
                                fontSize={20} 
                                className='text-gray-400 cursor-pointer hover:text-white'
                            />
                            <Icon 
                                icon="material-symbols:repeat" 
                                fontSize={20} 
                                className='text-gray-400 cursor-pointer hover:text-white'
                            />
                        </div>

                        <div>
                            {/* song progress bar */}
                        </div>
                    </div>

                    <div className='w-1/4 h-full' >
                        
                    </div>

                </div>
            )}
        </div>
    )
}
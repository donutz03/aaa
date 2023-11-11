using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Hellmade.Sound;
public class TestAudio : MonoBehaviour
{
    public AudioClip Clickclip;

    public void PlaySound()
    {
        EazySoundManager.PlaySound(Clickclip);
     
    }

    public AudioClip BackgroundMusic;

    public void PlayBackgroundMusic()
    {
        EazySoundManager.StopAllMusic();

        EazySoundManager.PlayMusic(BackgroundMusic);
    }
}

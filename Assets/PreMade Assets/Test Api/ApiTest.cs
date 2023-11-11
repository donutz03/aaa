using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

namespace NApi // NAPI :P
{
    public class ApiManager : MonoBehaviour {
        [Header("Configuration")]
        [SerializeField] private const int ApiTimeOutTimer = 10;
        [SerializeField] public string apiUrl = "https://quizapi.io/api/v1/questions";
        [SerializeField] public string tokenLogin;
        [SerializeField] public string apiLink = "https://quizapi.io/api/v1/questions";


        private NetworkReachability ReachabilityType => Application.internetReachability;

        public bool HasInternetConnection()
        {
            switch (ReachabilityType)
            {
                case NetworkReachability.NotReachable:
                    return false;

                case NetworkReachability.ReachableViaCarrierDataNetwork:
                    return true;

                case NetworkReachability.ReachableViaLocalAreaNetwork:
                    return true;
            }

            return true;
        }

        #region Calls

        [ContextMenu("Send Request")]
        public void SendRequest()
        {
            StartCoroutine(RequestGetApi(null));
        }

        public IEnumerator RequestGetApi(Action<ApiResponse, string> OnFinish)
        {
            // Construct the URL with query parameters
            string url = apiLink;

            Debug.LogWarning(url);

            // Create a UnityWebRequest
            using (UnityWebRequest www = UnityWebRequest.Get(url))
            {
                // Send the request and wait for a response
                www.SetRequestHeader("X-Api-Key", tokenLogin);

                Debug.LogWarning(www.url);

                yield return www.SendWebRequest();

                // Check for errors
                if (www.result != UnityWebRequest.Result.Success)
                {
                    Debug.LogError($"Error: {www.error} " + www.downloadHandler.text);
                }
                else
                {
                    // Parse and handle the response
                    string jsonResponse = www.downloadHandler.text;
                    Debug.Log($"API Response: {jsonResponse}");
                }
            }
        }
        #endregion
    }

    public enum ApiResponse
    {
        NoInternet,
        Error,
        Done
    }

    public class Questions
    {
        public string Question;
        public 
    }
}
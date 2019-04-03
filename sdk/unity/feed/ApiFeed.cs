using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;

public class ApiFeed {
    Server web;
    const string ENDPOINT = "api/feed";


    public void Init(Server web) {
        this.web = web;
    }

    public async Task < List < ModelFeed >> GetList(ListOptions options = null) {
        ListOptions ops = options ? ? new ListOptions();
        string url = ENDPOINT + "s?skip=" + ops.skip + "&limit=" + ops.limit;

        var res = await web.Get(url);
        return res.err ? null : res.data["data"]["data"].AsArray.DeserializeList < ModelFeed > ();
    }

    public async Task < ModelFeed > Get(string id) {
        var res = await web.Get(ENDPOINT + "/" + id);
        return res.err ? null : res.data["data"].Deserialize < ModelFeed > ();
    }

    public async Task < ModelFeed > Create(ModelFeed data) {
        var res = await web.Post(ENDPOINT, data.Serialize());
        return res.err ? null : res.data["data"].Deserialize < ModelFeed > ();
    }

    public async Task < ModelFeed > Edit(ModelFeed data) {
        Debug.Log("ED: " + data.Serialize());
        var res = await web.Put(ENDPOINT + "/" + data._id, data.Serialize());
        return res.err ? null : data;
    }


    public async Task < bool > Delete(ModelFeed data) {
        return await Delete(data._id);
    }

    public async Task < bool > Delete(string id) {
        var res = await web.Delete(ENDPOINT + "/" + id);
        Debug.Log("res: " + res.data);
        return !res.err;
    }

    public async Task < List < ModelFeed >> Search(string keyword, ListOptions options = null) {
        ListOptions ops = options ? ? new ListOptions();
        string url = ENDPOINT + "s/search?skip=" + ops.skip + "&limit=" + ops.limit;

        var res = await web.Get(ENDPOINT + "&keyword="+keyword);
        return res.err ? null : res.data["data"]["data"].AsArray.DeserializeList < ModelFeed > ();
    }


    public async Task < ModelFeedFileUpload > UploadFile(ModelFeed data, string filePath) {
        return await UploadFile(data._id, filePath);
    }

    public async Task < ModelFeedFileUpload > UploadFile(string id, string filePath) {
        var res = await web.PostFile(ENDPOINT + "/" + id + "/upload", filePath, "file");
        return res.err ? null : res.data["data"].Deserialize < ModelFeedFileUpload > ();
    }




}

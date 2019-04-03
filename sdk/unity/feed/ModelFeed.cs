using System;
using SimpleJSON;
using UnityEngine;

[Serializable]
public class ModelFeed {

    public string _id;

    public string createdAt;
    public string updatedAt;

     
	public string id;  
	public string user_id;  
	public string created_at;  
	public string text;  
	public string place;  
	public string geo;  
	public string likes;  
	public string comments; 

    public ModelFeed() {}

    public ModelFeed(JSONNode data) {
        this._id = data["_id"];

        this.createdAt = data["createdAt"];
        this.updatedAt = data["updatedAt"];

		 
		this.id = data["id"];  
		this.user_id = data["user_id"];  
		this.created_at = data["created_at"];  
		this.text = data["text"];  
		this.place = data["place"];  
		this.geo = data["geo"];  
		this.likes = data["likes"];  
		this.comments = data["comments"]; 
    }

    public string ToJSON() {
        //return JsonUtility.ToJson(this);
        JSONNode data = JSON.Parse("{}");

		 
		data["id"] = this.id;  
		data["user_id"] = this.user_id;  
		data["created_at"] = this.created_at;  
		data["text"] = this.text;  
		data["place"] = this.place;  
		data["geo"] = this.geo;  
		data["likes"] = this.likes;  
		data["comments"] = this.comments; 
	
        return data.ToString();
    }

}

[Serializable]
public class ModelFeedFileUpload {
    public string file;

    public ModelFeedFileUpload(JSONNode data) {
        this.file = data["file"];
    }
}

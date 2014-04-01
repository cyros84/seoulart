/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "moon.sample.SeoulArtMuseum",
	kind: "moon.Panels",
	pattern: "activity",
	classes: "moon enyo-fit",
	
	//tag:"background", src:"Sema_01.jpg", 
	published: {
		collection : null
	},
	components: [
		{kind: "moon.Panel", name: "mainPanel", classes:"moon-3h", headerBackgroundSrc:"assets/Logo_BW.jpg", title:"", components: [
			{kind:"moon.Item", content:"Introduction"},
			{kind:"moon.Item", content:"Gallery"},
			{kind:"moon.Item", content:"SeMA"},
			{kind:"moon.Item", content:"App Info"}
		]},
		
		{kind: "moon.Panel", name:"subPanel", joinToPrev: true, title:"Seoul Museum of Art", headerBackgroundSrc:"assets/Sema_Title.jpg", headerComponents: [
			{kind: "moon.Button", content:"Next", ontap:"nextItems"}], 
			components: [
			{name: "gridList", fit: true, spacing: 20, minWidth: 180, minHeight: 270, kind: "moon.DataGridList", 
			scrollerOptions: { kind: "moon.Scroller", vertical:"scroll", horizontal: "hidden", spotlightPagingControls: true }, 
			components: [
				{ kind: "moon.sample.GridSampleItem", ontap:"showlog"}
			]}
		]},

		//add panel by nicolas
		{kind: "moon.Panel", name: "detailImage", }
	],

	// To.오선임님 - collection 관련 부분적으로 구현된 것을 갖고 왔습니다. 참고 부탁드립니다.
	bindings: [
		{from: ".collection", to: ".$.dataList.collection"},
		{from: ".collection", to: ".$.gridList.collection"}	
		//{from:"data.EnglishListCollectionOfSeoulMOAService.row[0].NAME_E", }	
	],
	
	create: function () {
		this.inherited(arguments);
		// we set the collection that will fire the binding and add it to the list
		//this.set("collection", new enyo.Collection(this.generateRecords()));
		//var a = new seoulart.ArtCollection();
		//a.fetch();
		//this.set("collection", new seoulart.ArtCollection({start_number:'1', end_number:'5'}));
		
		this.set("collection", new seoulart.ArtCollection({start_number:'1', end_number:'40'}));
	},
	
	/*
	generateRecords: function () {
		var records = [],
			idx     = this.index || 1;
		for (; records.length < 40; ++idx) {
			var title = "Title";
			var subTitle = "Artist";
			records.push({
				text: title + idx,
				subText: subTitle + idx,
				url: "http://placehold.it/300x300/" + "/ffffff&text=Image " + idx
			});
		}
		// update our internal index so it will always generate unique values
		this.index = idx;
		return records;
	},
	*/
	
	nextItems: function () {
		// we fetch our collection reference
		var collection = this.get("collection");
		// we now remove all of the current records from the collection
		collection.removeAll();
		// and we insert all new records that will update the list
		//collection.add(this.generateRecords());
		this.set("collection", new seoulart.ArtCollection({start_number:'41', end_number:'80'}));
	},
	showlog : function(){
		alert("clicked");
	}
});

enyo.kind({
	name: "moon.sample.GridSampleItem",
	kind: "moon.GridListImageItem",
	selectionOverlayVerticalOffset: 35,
	subCaption: "Sub Caption",
	bindings: [
		{from: ".model.SUBJECT_E", to: ".caption"},
		{from: ".model.NAME_E", to: ".subCaption"},
		{from: ".model.MAIN_IMG", to: ".source"}
	]
});
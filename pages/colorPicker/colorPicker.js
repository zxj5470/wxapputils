// colorPicker.js
const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//default value 66CCFF
		cr: 102,
		cg: 204,
		cb: 255,
		currentColor: "",
		inputValue: ""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (options.color !== undefined) {
			let color = hexToRGB(options.color)
			this.setData({
				cr: color.r,
				cg: color.g,
				cb: color.b
			})
			this.setData({
				currentColor: rgbToColorHex(this.data.cr, this.data.cg, this.data.cb),
				inputValue: rgbToHex(this.data.cr, this.data.cg, this.data.cb)
			})
		}
	},

	bindchanging: function (e) {
		switch (e.target.id) {
			case 'colorR':
				this.setData({
					cr: e.detail.value
				})
				break
			case 'colorG':
				this.setData({
					cg: e.detail.value
				})
				break
			case 'colorB':
				this.setData({
					cb: e.detail.value
				})
				break
		}
		this.setData({
			currentColor: rgbToColorHex(this.data.cr, this.data.cg, this.data.cb),
			inputValue: rgbToHex(this.data.cr, this.data.cg, this.data.cb)
		})
	},
	bindinput: function (e) {
		if (e.detail.value.length === 6) {
			let color = hexToRGB(e.detail.value)
			this.setData({
				cr: color.r,
				cg: color.g,
				cb: color.b,
				currentColor: rgbToColorHex(color.r, color.g, color.b)
			})
		}
	},
	numberInput: function (e) {
		const v = Number(e.detail.value)
		if (v <= 255 && v > 0) {
			switch (e.target.id) {
				case 'inputR':
					this.setData({
						cr: v
					})
					break
				case 'inputG':
					this.setData({
						cg: v
					})
					break
				case 'inputB':
					this.setData({
						cb: v
					})
					break
			}
			this.setData({
				currentColor: rgbToColorHex(this.data.cr, this.data.cg, this.data.cb),
				inputValue: rgbToHex(this.data.cr, this.data.cg, this.data.cb)
			})
		}
	},
	buttonAdd: function (e) {
		const id = e.target.id
		switch (id) {
			case 'rUp':
				if (this.data.cr + 1 < 256)
					this.setData({
						cr: this.data.cr + 1
					})
				break
			case 'gUp':
				if (this.data.cg + 1 < 256)
					this.setData({
						cg: this.data.cg + 1
					})
				break
			case 'bUp':
				if (this.data.cb + 1 < 256)
					this.setData({
						cb: this.data.cb + 1
					})
				break
		}
		this.setData({
			currentColor: rgbToColorHex(this.data.cr, this.data.cg, this.data.cb),
			inputValue: rgbToHex(this.data.cr, this.data.cg, this.data.cb)
		})
	},
	buttonMinus: function (e) {
		const id = e.target.id
		switch (id) {
			case 'rDown':
				if (this.data.cr - 1 >= 0)
					this.setData({
						cr: this.data.cr - 1
					})
				break
			case 'gDown':
				if (this.data.cg - 1 >= 0)
					this.setData({
						cg: this.data.cg - 1
					})
				break
			case 'bDown':
				if (this.data.cb - 1 >= 0)
					this.setData({
						cb: this.data.cb - 1
					})
				break
		}
		this.setData({
			currentColor: rgbToColorHex(this.data.cr, this.data.cg, this.data.cb),
			inputValue: rgbToHex(this.data.cr, this.data.cg, this.data.cb)
		})
	},

	colorToClipboard:function (e){
		wx.setClipboardData({
			data:this.data.inputValue,
			success:()=>{wx.showToast({title:`复制成功`})},//字数限制……如果加上值就只能到‘成’字
			fail:()=>{wx.showToast({title:'居然失败了……'})}
		})
	},

	confirmColor: function (e) {
		app.globalData.color = this.data.currentColor
		wx.navigateBack()
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})

function componentToHex(c) {
	const hex = c.toString(16).toUpperCase()
	return hex.length === 1 ? "0" + hex : hex
}

function hexToRGB(hex) {
	const bigint = parseInt(hex, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	return {r: r, g: g, b: b}
}

function rgbToHex(r, g, b) {
	return `${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

function rgbToColorHex(r, g, b) {
	return '#' + rgbToHex(r, g, b)
}

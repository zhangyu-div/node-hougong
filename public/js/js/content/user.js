class User {
    constructor() {
        this.container = $(".content");
        this.init();
    }
    init() {
        this.createPage();
    }
    createPage() {
        this.container.html(User.template);
        this.getUsersList();
    }
    getUsersList() {
        $.ajax({
            type: "get",
            url: "/users/usersList",
            data: {
                page: 1,
                limit: 10
            },
            success: this.handleGetUsersList.bind(this)
        })
    }
    handleGetUsersList(data) {
        console.log(data);
        this.data = data.data.list;
        let str = "";
        for (var i = 0; i < data.data.list.length; i++) {
            var time=data.data.list[i].registerTime;
            var da = new Date(time);
            var year = da.getFullYear() + '年';
            var month = da.getMonth() + 1 + '月';
            var date = da.getDate() + '日';
            var hour = da.getHours() + '时';
            var min = da.getMinutes() + '分';
            time=([year, month, date, hour,min].join('-'));
            str += `
            <tr>
            <td>${data.data.list[i].name}</td>
            <td style="width:90px">
                <img src="http://localhost:3000/img/timg.png"/>
            </td>
            <td>${data.data.list[i].username}</td>
            <td class="time">${time}</td>
            <td>${data.data.list[i].status}</td>
        </tr>
            `
        }
        this.container.find(".user tbody").html(str);
    }
}

User.template = `
    <div class="user">
        <table class="table table-striped">
            <thead class="usertr">
                <tr>
                    <th>用户昵称</th>
                    <th>用户头像</th>
                    <th>用户账号</th>
                    <th>注册时间</th>
                    <th>用户状态</th>
                </tr>
            </thead>
            <tbody class="usertr">
                <tr>
                    <td>叶赫那拉·惠征</td>
                    <td style="width:90px">
                        <img src="http://localhost:3000/img/timg.png"/>
                    </td>
                    <td>11111111</td>
                    <td>2019 10 2</td>
                    <td>如狼似虎</td>
                </tr>
            </tbody>
        </table>
    </div>
`
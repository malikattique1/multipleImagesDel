
$(document).ready(function () {
    $.ajax({
        url: `${apiBaseUrl}/api/wallpaper/categories`,
        // url: `https://downloadvid.app/wallpaper/api/wallpaper/categories`,
        type: "GET",
        headers: {
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsicHJvZmlsZV9waWMiOiIiLCJmdWxsX25hbWUiOiJub2V4cGlyZSIsImZvbGxvd2Vyc19jb3VudCI6MCwiZm9sbG93aW5nc19jb3VudCI6MCwic3RpY2tlcnNfY291bnQiOjAsInN0aWNrZXJwYWNrX2NvdW50cyI6MCwiZW1haWwiOiJub2V4cGlyZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im5vZXhwaXJlIiwiaXNfcHJlbWl1bSI6MH0sImlhdCI6MTY2NzM3MDc4OH0.lAzkPlS6McJTr6tdYfHqUoqJdc1BBcjm4tWDINJ0cPI',
        }
    }).done(function (result) {
        console.log("dwdsss", result.data)
        category_table.clear().draw();
        category_table.rows.add(result.data).draw();
    });


    var category_table = $('#categories-table').DataTable({
        columns: [
            { data: "id" },
            {
                "targets": 0,
                "className": "text-center",
                "data": "thumbnail",
                "render": function (data, type, row) {
                    return '<img style="z-index:2111111 !important; width:50px !important; align-items:center !important " class="imginsidetable" src="' + data + '" />';
                }
            },
            { defaultContent: '<input type="checkbox" class="select-checkbox" />' },
            { defaultContent: '<input data-toggle="modal" data-target="#myModal22" type="button" id="Edit" class="Edit" value="Edit"/>&nbsp&nbsp<input type="button" class="delete" value="Delete"/>' },
        ],
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
    });


$('#deleteSelected').on('click', function () {
    var selectedCheckboxes = $('.select-checkbox:checked');
    var selectedRows = [];
    selectedCheckboxes.each(function () {
        var row = $(this).closest('tr');
        var rowData = category_table.row(row).data();
        selectedRows.push(rowData);
    });
    handleDelete(selectedRows);
});

function handleDelete(selectedRows) {
    if (selectedRows.length > 0) {
        var selectedIds = selectedRows.map(row => row.id);
        console.log(selectedIds)
        $.ajax({
            url: `${apiBaseUrl}/api/wallpaper/category`,
            method: 'DELETE',
            data: { id: selectedIds }, 
            headers: {
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsicHJvZmlsZV9waWMiOiIiLCJmdWxsX25hbWUiOiJub2V4cGlyZSIsImZvbGxvd2Vyc19jb3VudCI6MCwiZm9sbG93aW5nc19jb3VudCI6MCwic3RpY2tlcnNfY291bnQiOjAsInN0aWNrZXJwYWNrX2NvdW50cyI6MCwiZW1haWwiOiJub2V4cGlyZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im5vZXhwaXJlIiwiaXNfcHJlbWl1bSI6MH0sImlhdCI6MTY2NzM3MDc4OH0.lAzkPlS6McJTr6tdYfHqUoqJdc1BBcjm4tWDINJ0cPI'
            },
            success: function (response) {
                console.log('Rows deleted successfully from the backend:', response);
                selectedIds.forEach(id => {
                    var index = category_table.rows().indexes().filter(function (value, index) {
                        return category_table.row(value).data().id == id;
                    });
                    category_table.row(index).remove();
                });
                category_table.draw();
            },
            error: function (error) {
                console.error('Error deleting rows from the backend:', error);
            }
        });
    
    } else {
        console.log('No rows selected for deletion.');
    }
}






$('#updateSelected').on('click', function () {
    var selectedCheckboxes = $('.select-checkbox:checked');
    var selectedRows = [];
    selectedCheckboxes.each(function () {
        var row = $(this).closest('tr');
        var rowData = category_table.row(row).data();
        selectedRows.push(rowData);
    });
    handleUpdate(selectedRows);
});

function handleUpdate(selectedRows) {
    if (selectedRows.length > 0) {
        var selectedIds = selectedRows.map(row => row.id);
        console.log(selectedIds)
        $.ajax({
            url: `${apiBaseUrl}/api/wallpaper/category`,
            method: 'PATCH',
            data: { id: selectedIds }, 
            headers: {
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsicHJvZmlsZV9waWMiOiIiLCJmdWxsX25hbWUiOiJub2V4cGlyZSIsImZvbGxvd2Vyc19jb3VudCI6MCwiZm9sbG93aW5nc19jb3VudCI6MCwic3RpY2tlcnNfY291bnQiOjAsInN0aWNrZXJwYWNrX2NvdW50cyI6MCwiZW1haWwiOiJub2V4cGlyZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im5vZXhwaXJlIiwiaXNfcHJlbWl1bSI6MH0sImlhdCI6MTY2NzM3MDc4OH0.lAzkPlS6McJTr6tdYfHqUoqJdc1BBcjm4tWDINJ0cPI'
            },
            success: function (response) {
                console.log('Rows updated successfully from the backend:', response);
                selectedIds.forEach(id => {
                    var index = category_table.rows().indexes().filter(function (value, index) {
                        return category_table.row(value).data().id == id;
                    });
                    category_table.row(index).remove();
                });
                category_table.draw();
            },
            error: function (error) {
                console.error('Error updating rows from the backend:', error);
            }
        });
    } else {
        console.log('No rows selected for updation.');
    }
}









    $('#categories-table tbody').on('click', '.delete', async function () {
        var row = $(this).closest('tr');
        var datasss = category_table.row(row).data()
        console.log("dta", datasss);
        var id = category_table.row(row).data().id;
        console.log(id);
        var name = category_table.row(row).data().name;
        console.log(name);
        category_table.row($(this).parents('tr')).remove().draw();

        await axios.delete(`${apiBaseUrl}/api/wallpaper/category`, {
            data: { id: id },
            // await axios.delete('https://downloadvid.app/wallpaper/api/wallpaper/category',{data: { id: id },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': 'Accept,authorization,Authorization, Content-Type',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsicHJvZmlsZV9waWMiOiIiLCJmdWxsX25hbWUiOiJub2V4cGlyZSIsImZvbGxvd2Vyc19jb3VudCI6MCwiZm9sbG93aW5nc19jb3VudCI6MCwic3RpY2tlcnNfY291bnQiOjAsInN0aWNrZXJwYWNrX2NvdW50cyI6MCwiZW1haWwiOiJub2V4cGlyZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im5vZXhwaXJlIiwiaXNfcHJlbWl1bSI6MH0sImlhdCI6MTY2NzM3MDc4OH0.lAzkPlS6McJTr6tdYfHqUoqJdc1BBcjm4tWDINJ0cPI'
            }
        }).then(async (res) => {
            console.log(res)
            var data = [];
            $("#categories-table tr").each(function (i, v) {
                if (i > 0) {
                    $(this).find("td").eq(3).html(i);
                }
                data[i] = [];
                $(this).children('td').each(function (ii, vv) {
                    vv = data[i][ii] = $(this).text();
                });
            })
            console.log("alllll", data)
            for (let i = 1; i < data.length; i++) {
                console.log("ids", data[i][0]);
                console.log("name", data[i][1]);
                console.log("thumbnail", data[i][2]);
                console.log("order", data[i][3]);
                await axios.patch(`${apiBaseUrl}/api/wallpaper/category/order/${data[i][0]}`, { "order": data[i][3] }, {
                    // await axios.patch(`https://downloadvid.app/wallpaper/api/wallpaper/category/order/${data[i][0]}`, { "order": data[i][3] }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        'Access-Control-Allow-Headers': 'Accept,authorization,Authorization, Content-Type',
                        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsicHJvZmlsZV9waWMiOiIiLCJmdWxsX25hbWUiOiJub2V4cGlyZSIsImZvbGxvd2Vyc19jb3VudCI6MCwiZm9sbG93aW5nc19jb3VudCI6MCwic3RpY2tlcnNfY291bnQiOjAsInN0aWNrZXJwYWNrX2NvdW50cyI6MCwiZW1haWwiOiJub2V4cGlyZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im5vZXhwaXJlIiwiaXNfcHJlbWl1bSI6MH0sImlhdCI6MTY2NzM3MDc4OH0.lAzkPlS6McJTr6tdYfHqUoqJdc1BBcjm4tWDINJ0cPI'
                    }
                }).then(res => console.log(res)).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    });


    $('#categories-table tbody').on('click', 'td:nth-child(2)', function () {
        var row = $(this).closest('tr');
        var link = category_table.row(row).data().thumbnail
        window.open(`${link}`, '_blank');
    });

    $('#categories-table tbody').on('click', '.Edit', function () {
        var row = $(this).closest('tr');
        var datasss = category_table.row(row).data()
        console.log("dta", datasss);
        var id = category_table.row(row).data().id;
        console.log(id);
        var name = category_table.row(row).data().name;
        console.log(name);
        var order = category_table.row(row).data().order;
        console.log(order);
        $('#rowid').val(id);
        $('#rowname').val(name);
        $('#roworder').val(order);
    });



});




async function uploadFilecategory() {
    if ($('#namecategory').val() == '') {
        return
    }
    let form = document.getElementById('submitformcategory');
    form.addEventListener('submit', async (e) => {
        $('.loading-spinner').toggleClass('active');
        e.preventDefault();
        e.stopImmediatePropagation();
        let formData = new FormData(form);
        console.log("ppp", formData)
        await axios.post(`${apiBaseUrl}/api/wallpaper/category/`, formData, {
            //  await axios.post('https://downloadvid.app/wallpaper/api/wallpaper/category/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': 'Accept,authorization,Authorization, Content-Type',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsicHJvZmlsZV9waWMiOiIiLCJmdWxsX25hbWUiOiJub2V4cGlyZSIsImZvbGxvd2Vyc19jb3VudCI6MCwiZm9sbG93aW5nc19jb3VudCI6MCwic3RpY2tlcnNfY291bnQiOjAsInN0aWNrZXJwYWNrX2NvdW50cyI6MCwiZW1haWwiOiJub2V4cGlyZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im5vZXhwaXJlIiwiaXNfcHJlbWl1bSI6MH0sImlhdCI6MTY2NzM3MDc4OH0.lAzkPlS6McJTr6tdYfHqUoqJdc1BBcjm4tWDINJ0cPI'
            }
        }).then(res => {
            console.log(res);
            alert(res.data.message)
            if (res.data.success == 1) {
                $('#editrowformcategory').trigger("reset");
                $('.loading-spinner').toggleClass('active')
                $("#createcategory-dt2").click()
                location.reload();
            }
            else {
                $('.loading-spinner').toggleClass('active')
                console.log("change your data")
            }

        }).catch(err => console.log(err))

        return
    });
    return
}






async function uploadFilerowcategoryupdate() {
    if ($('#rowname').val() == '' || $('#roworder').val() == '') {
        return
    }
    let form = document.getElementById('editrowformcategory');
    form.addEventListener('submit', async (e) => {
        $('.loading-spinner').toggleClass('active');
        e.preventDefault();
        e.stopImmediatePropagation();
        let formData = new FormData(form);
        console.log("pppform", formData)
        const json = JSON.stringify(Object.fromEntries(formData));
        console.log("json1", json)
        const obj = JSON.parse(json);
        console.log("obj", obj.id)
        console.log("json2", json)

        await axios.patch(`${apiBaseUrl}/api/wallpaper/category/${obj.id}`, formData, {
            //  await axios.patch(`https://downloadvid.app/wallpaper/api/wallpaper/category/${obj.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': 'Accept,authorization,Authorization, Content-Type',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsicHJvZmlsZV9waWMiOiIiLCJmdWxsX25hbWUiOiJub2V4cGlyZSIsImZvbGxvd2Vyc19jb3VudCI6MCwiZm9sbG93aW5nc19jb3VudCI6MCwic3RpY2tlcnNfY291bnQiOjAsInN0aWNrZXJwYWNrX2NvdW50cyI6MCwiZW1haWwiOiJub2V4cGlyZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im5vZXhwaXJlIiwiaXNfcHJlbWl1bSI6MH0sImlhdCI6MTY2NzM3MDc4OH0.lAzkPlS6McJTr6tdYfHqUoqJdc1BBcjm4tWDINJ0cPI'
            }
        }).then(res => {
            console.log(res);
            alert(res.data.message)
            if (res.data.success == 1) {
                $('#editrowformcategory').trigger("reset");
                $('.loading-spinner').toggleClass('active')
                $("#myModal22").click()
                location.reload();
            }
            else {
                $('.loading-spinner').toggleClass('active')
                console.log("change your data")
            }
        }).catch(err => console.log(err))
        return
    });
    return
}











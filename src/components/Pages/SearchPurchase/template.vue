<template src="./template.html" />

<script>
import DataTable from "../../Parts/DataTable/template.vue"; //表格組件

export default {
  components: { DataTable },
  data() {
    return {
      dataList: [], //採購資料
      columnList: [
        {
          field: "purchaseBikeID",
          label: "編號",
          width: "30",
          searchable: true,
          sortable: true,
        },
        {
          field: "bikeName",
          label: "品名",
          width: "100",
          sortable: true,
          searchable: true,
        },
        {
          field: "bikeModel",
          label: "車種",
          width: "30",
          sortable: true,
          searchable: true,
        },
        {
          field: "manufacturer",
          label: "廠商",
          width: "30",
          sortable: true,
          searchable: true,
        },
        {
          field: "quantity",
          label: "數量",
          width: "30",
          sortable: true,
          searchable: true,
        },
        {
          field: "price",
          label: "價格",
          width: "100",
          sortable: true,
          searchable: true,
        },
        {
          field: "date",
          label: "採購日期",
          width: "100",
          sortable: true,
          searchable: true,
        },
        {
          field: "purchaseStatus",
          label: "狀態",
          width: "30",
          sortable: true,
          searchable: true,
        },
      ], //採購欄位
      selected: null, //所選列
      isLoading: false, //loading
      perPage: 10, //自訂列數
      activeTab: 0,
    };
  },
  async created() {
    this.axios.defaults.baseURL = "https://bikebackend.azurewebsites.net/api/";

    await this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      await this.axios
        .get("PurchaseBike", {
          headers: {
            Authorization: `Bearer ${this.$store.state.APIToken}`,
          },
        })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data)); //深拷貝
          this.dataList.forEach(function (item) {
            if (item.purchaseStatus == 0) {
              item.purchaseStatus = "正常";
              return item;
            } else {
              item.purchaseStatus = "作廢";
              return item;
            }
          });
        })
        .catch((err) => alert(err));
      this.isLoading = false;
    }, //取得採購資料
    async changeStatus() {
      let id = this.selected["purchaseBikeID"];
      let changedStatus =
        this.selected["purchaseStatus"] === "正常" ? true : false;
      let data = {
        bikeName: this.selected["bikeName"],
        bikeModel: this.selected["bikeModel"],
        manufacturer: this.selected["manufacturer"],
        quantity: this.selected["quantity"],
        price: this.selected["price"],
        date: this.selected["date"],
        purchaseStatus: changedStatus,
      };
      console.log(data);

      await this.axios
        .put(`PurchaseBike/${id}`, data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.APIToken}`,
          },
        })
        .then(() => {
          this.$buefy.dialog.alert({
            title: "成功",
            message: `成功修改採購狀態`,
            type: "is-success",
            hasIcon: true,
            icon: "fa-check",
            iconPack: "fa",
            ariaModal: true,
          });
          this.selected = null;
        })
        .catch((e) => {
          this.$buefy.dialog.alert({
            title: "Error",
            message: `${e}`,
            type: "is-danger",
            hasIcon: true,
            icon: "times-circle",
            iconPack: "fa",
            ariaRole: "alertdialog",
            ariaModal: true,
          });
        });
      this.getData();
    }, //採購狀態變更
  },
};
</script>
<style>
.tabs span {
  font-family: "Ink free", "標楷體";
  font-size: 24px;
  color: #ffffff !important;
}
.search-purchase .is-active span {
  color: darksalmon !important;
}
.search-purchase .tabs li.is-active a {
  border-bottom-color: darksalmon !important;
}
</style>

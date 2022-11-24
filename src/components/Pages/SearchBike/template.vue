<template src="./template.html" />

<script>
import DataTable from "../../Parts/DataTable/template.vue"; //表格組件

export default {
  components: { DataTable },
  data() {
    return {
      dataList: [], //腳踏車資料
      columnList: [
        {
          field: "bikeStatusID",
          label: "編號",
          width: "30",
          searchable: true,
          sortable: true,
        },
        {
          field: "purchaseBikeID",
          label: "採購編號",
          width: "100",
          sortable: true,
          searchable: true,
        },
        {
          field: "bikeName",
          label: "腳踏車名稱",
          width: "100",
          sortable: true,
          searchable: true,
        },
        {
          field: "manufacturer",
          label: "廠商",
          width: "100",
          sortable: true,
          searchable: true,
        },
        {
          field: "rentalStatus",
          label: "租借狀態",
          width: "30",
          sortable: true,
          searchable: true,
        },
        {
          field: "bikeStauts",
          label: "車況",
          width: "30",
          sortable: true,
          searchable: true,
        },
      ], //腳踏車欄位
      selected: null, //所選列
      isLoading: false, //loading
      perPage: 10, //自訂列數
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
        .get("BikeStatus", {
          headers: {
            Authorization: `Bearer ${this.$store.state.APIToken}`,
          },
        })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data)); //深拷貝
          this.dataList.forEach(function (item) {
            item.rentalStatus = "未出租";
            item.bikeStauts = "良好";
            return item;
          });
          console.log(this.dataList);
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
.search-bike {
  padding: 30px;
}
/* .is-active span {
  color: darksalmon !important;
} */
/* .tabs li.is-active a {
  border-bottom-color: darksalmon !important;
} */
</style>

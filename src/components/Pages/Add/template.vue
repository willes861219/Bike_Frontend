<template src="./template.html" />

<script>
import DataTable from "../../Parts/DataTable/template.vue"; //表格組件

export default {
  components: { DataTable },
  data() {
    return {
      mfrsList: [], //廠商清單
      modelList: [], //車種清單
      mfrs: null, //廠商
      model: null, //車種
      bikeName: "", //品名
      quantity: 1, //數量
      price: 0, //價格
      date: null, //日期
      quantityError: false, //判斷數量有沒有超過
      tempData: [], //暫存資料
      tempColumn: [
        {
          field: "id",
          label: "暫存編號",
          width: "100",
          sortable: true,
          searchable: true,
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
          field: "quantity",
          label: "數量",
          width: "100",
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
      ], //暫存欄位
      isLoading: false, // Loading
      selected: null, //所選取列
      perPage: 5, //自訂列數
    };
  },
  created() {
    this.axios.defaults.baseURL = "https://bikebackend.azurewebsites.net/api/";
    this.getMfrs();
    this.getBikeModel();
  },
  watch: {
    quantity(newVal) {
      if (newVal > 99 || newVal < 1) {
        this.quantityError = true;
      } else {
        this.quantityError = false;
      }
    },
  },
  methods: {
    async getMfrs() {
      await this.axios
        .get("BikeMfrs", {
          headers: {
            Authorization: `Bearer ${this.$store.state.APIToken}`,
          },
        })
        .then((res) => {
          this.mfrsList = JSON.parse(JSON.stringify(res.data)); //深拷貝
        })
        .catch((err) => alert(err));
    }, //取得廠商清單
    async getBikeModel() {
      await this.axios
        .get("BikeModel", {
          headers: {
            Authorization: `Bearer ${this.$store.state.APIToken}`,
          },
        })
        .then((res) => {
          this.modelList = JSON.parse(JSON.stringify(res.data)); //深拷貝
        })
        .catch((err) => alert(err));
    }, //取得廠商清單
    async pushData() {
      let data = this.tempData.filter((item) => {
        return !item.id;
      });
      console.log(data);
      // await this.tempData.map((item, index) => {
      //   this.axios
      //     .post("PurchaseBike", item, {
      //       headers: {
      //         Authorization: `Bearer ${this.$store.state.APIToken}`,
      //       },
      //     })
      //     .then(() => {
      //       this.$buefy.toast.open({
      //         duration: 6000,
      //         message: `成功推送第${index + 1}筆資料`,
      //         position: "is-bottom",
      //         type: "is-success",
      //       });
      //     })
      //     .catch((err) => {
      //       this.$buefy.toast.open({
      //         duration: 6000,
      //         message: `失敗！原因：${err}`,
      //         position: "is-bottom",
      //         type: "is-danger",
      //       });
      //     });
      // });
    }, // 推送所有暫存資料
    deleteTemp() {
      console.log(this.selected["id"]);
      this.tempData.map((item, index, arr) => {
        console.log((item = arr[index] != this.selected["id"] - 1));
        // return index !== this.selected["id"] - 1;
      });
      // this.tempData.forEach((item, index) => {
      //   console.log(item, index);
      // });
    },
    addData() {
      this.isLoading = true;
      if (
        this.mfrs === "" ||
        this.mfrs === null ||
        this.model === "" ||
        this.model === null ||
        this.bikeName === "" ||
        this.bikeName === null ||
        this.quantity === "" ||
        this.quantity === null ||
        this.price === "" ||
        this.price === null ||
        this.date === "" ||
        this.date === null ||
        this.quantityError
      ) {
        this.$buefy.dialog.alert({
          title: "資料有誤",
          message: `資料未正確填寫`,
          type: "is-danger",
          hasIcon: true,
          icon: "times-circle",
          iconPack: "fa",
          ariaRole: "alertdialog",
          ariaModal: true,
        });
      } else {
        let index = this.tempData.length + 1;
        let data = {
          id: index,
          bikeName: this.bikeName,
          bikeModel: this.model,
          manufacturer: this.mfrs,
          quantity: this.quantity,
          price: this.price,
          date: this.InitDate(this.date),
          purchaseStatus: false,
        };
        this.tempData.push(data);
      }
      this.isLoading = false;
    }, //新增一筆資料至暫存
    InitDate(date) {
      let current = new Date(date);
      let Month =
        current.getMonth() + 1 > 9
          ? current.getMonth() + 1
          : "0" + (current.getMonth() + 1);
      let day =
        current.getDate() > 9 ? current.getDate() : "0" + current.getDate();

      let initDate = current.getFullYear() + "-" + Month + "-" + day;

      return initDate;
    }, //格式化Date
  },
};
</script>

<style>
.addBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

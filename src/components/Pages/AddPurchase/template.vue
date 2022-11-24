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
      tempData: [], //暫存資料  有暫存ID
      newTempData: [], //新的暫存資料 無暫存ID
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
      tempId: 1,
      isLoading: false, // Loading
      selected: null, //所選取列
      perPage: 5, //自訂列數
    };
  },
  created() {
    // this.axios.defaults.baseURL = "https://localhost:44341/api/";
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
      await this.deleteTempId(); //刪除暫存ID
      for await (let item of this.newTempData) {
        await this.axios
          .post("PurchaseBike", item, {
            headers: {
              Authorization: `Bearer ${this.$store.state.APIToken}`,
            },
          })
          .then(async (res) => {
            this.$buefy.toast.open({
              duration: 6000,
              message: `成功推送資料`,
              position: "is-bottom",
              type: "is-success",
            });
            const data = {
              purchaseBikeID: res.data,
            }; //包裝成要傳遞的物件
            for (let i = 0; i < item.quantity; i++) {
              await this.addBikeStatus(data);
            } //res.data是purchaseId(採購ID)，取得後就執行非同步(新增對應單車資料)
          })
          .catch((err) => {
            this.$buefy.toast.open({
              duration: 6000,
              message: `失敗！原因：${err}`,
              position: "is-bottom",
              type: "is-danger",
            });
          });
      } //
      this.tempData = []; //送出之後清空
      this.newTempData = []; //送出之後清空
    }, // 推送暫存資料至資料庫
    async addBikeStatus(data) {
      await this.axios
        .post("BikeStatus", data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.APIToken}`,
          },
        })
        .then(() => {
          this.$buefy.toast.open({
            duration: 6000,
            message: `成功產生單車資料`,
            type: "is-success",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }, // 新增單車資料
    deleteTempId() {
      this.newTempData = this.tempData.filter((item) => {
        delete item.id;
        return item;
      }); // 把暫存ID刪除，取得要推送至資料庫的資料
    }, //刪除暫存資料ID
    deleteSelected() {
      this.tempData = this.tempData.filter((item) => {
        return item.id != this.selected["id"]; //刪除對應選取列的id
      });
    }, //刪除選取暫存列
    addTempData() {
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
        let index = this.tempId++; //替新增的temp資料加上暫存index，為了做刪除選取列
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
        this.tempData.push(data); //將包裝好的資料放進tempData內
      }
      this.isLoading = false;
    }, //新增一筆資料至tempData
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
    wait(sec) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`已經經過${sec}秒了`);
          resolve();
        }, sec * 1000);
      });
    }, //測試用-等待非同步
    async printArr() {
      const arr = [1, 3, 5, 2];
      for (let a of arr) {
        await this.wait(a);
      }
      console.log("done");
    }, //測試用-等待非同步
  },
};
</script>

<style>
.add-comopnent {
  padding: 40px;
  display: flex;
}
.addBtn {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .add-comopnent {
    flex-direction: column;
  }
}
</style>

module.exports = function(app) {
  let itemPembelian = app.models.itemPembelian;
  let barang = app.models.barang;

  let hook = (ctx, next) => {
    let data = ctx.instance;
    if (ctx.isNewInstance) {
      console.log(data);
      barang.findOne({ where: { id: data.barangId } }, (err, result) => {
        if (err) throw err;
        let stok = result.stok;
        stok -= data.jumlah;
        barang.updateAll({ id: data.barangId }, { stok: stok }, (err, info) => {
          if (err) throw err;
          console.log(info);
        });
      });
    }

    return next();
  };

  itemPembelian.observe('after save', hook);
};

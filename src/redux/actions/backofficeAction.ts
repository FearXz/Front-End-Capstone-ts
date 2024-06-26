import { toast } from "react-toastify";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../../functions/interceptor";
import { setIsLoading, toggleRefresh } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";
import {
  setListaGiorniDiChiusura,
  setListaIngredienti,
  setListaLocaliById,
  setListaProdotti,
  setListaTagCategories,
  setListaTipi,
  setLocaleById,
} from "../reducers/backofficeReducer";
import {
  CreateIngredientDto,
  CreateProductDto,
  EditProductDto,
  GetBoLocaleIdResponse,
  GetRistorantiByIdAziendaResponse,
  GetTipoProdottoResponse,
  GiorniDiChiusura,
  GiorniDiChiusuraDto,
  IngredientiProdottiLocale,
  LocalMainModalEditDto,
  LocalStatusDto,
  NewLocalDto,
  ProdottiLocale,
  TagCategorieDto,
  UpdateIngredientDto,
  categorieRistorante,
} from "../../interfaces/interfaces";
import { NavigateFunction } from "react-router-dom";

export const getListaRistorantiById = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/getristorantibyidazienda");
    if (response.ok) {
      const data: GetRistorantiByIdAziendaResponse[] = await response.json();
      dispatch(setListaLocaliById(data));
      console.log(data);

      toast.success("Dati Ristoranti  ottenuti con successo");
    } else {
      throw new Error("Errore nel recupero dei ristoranti");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei ristoranti");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const getGiorniDiChiusura = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/getgiornidichiusura/");
    if (response.ok) {
      const data: GiorniDiChiusura[] = await response.json();
      dispatch(setListaGiorniDiChiusura(data));

      console.log(data);
    } else {
      throw new Error("Errore nel recupero dei giorni di chiusura");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei giorni di chiusura");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const getTagCategories = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/gettagcategories/");
    if (response.ok) {
      const data: categorieRistorante[] = await response.json();
      dispatch(setListaTagCategories(data));

      console.log(data);
    } else {
      throw new Error("Errore nel recupero dei giorni di chiusura");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei giorni di chiusura");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const getRistorantiById = (id: number, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/getristorantebyid/" + id);
    if (response.ok) {
      const data: GetBoLocaleIdResponse[] = await response.json();
      dispatch(setLocaleById(data[0]));
      console.log(data[0]);
      if (!data[0]) {
        navigate("/backoffice");
      }
    } else {
      throw new Error("Errore nel recupero dei ristoranti");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei ristoranti");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const putTagCategories = (newCategories: TagCategorieDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/puttagcategories", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategories),
    });

    if (response.ok) {
      dispatch(toggleRefresh());
    } else {
      throw new Error("Errore nell'update delle categorie");
    }
  } catch (error) {
    toast.error("Errore nell'update delle categorie");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const putGiorniChiusura = (newDayOff: GiorniDiChiusuraDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/putgiornichiusura", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDayOff),
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Modifica effettuata con successo");
    } else {
      throw new Error("Errore nella modifica del giorno di chiusura");
    }
  } catch (error) {
    toast.error("Errore nella modifica del giorno di chiusura");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const confirmEvaso = (idOrder: number, idRistorante: number | null) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/confirmevaso", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idOrder, idRistorante }),
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Ordine confermato con successo");
    } else {
      throw new Error("Errore nella conferma dell'ordine");
    }
  } catch (error) {
    toast.error("Errore nella conferma dell'ordine");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const localeditmainmodal = (editObj: LocalMainModalEditDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/localeditmainmodal", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editObj),
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Ordine confermato con successo");
    } else {
      throw new Error("Errore nella conferma dell'ordine");
    }
  } catch (error) {
    toast.error("Errore nella conferma dell'ordine");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const updateLogo = (formData: FormData, idRistorante: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/updatelogo/" + idRistorante, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Immagine cambiata con successo");
    } else {
      throw new Error("Errore nel cambio dell'immagine");
    }
  } catch (error) {
    toast.error("Errore nel cambio dell'immagine");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const updateCopertina = (formData: FormData, idRistorante: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/updatecopertina/" + idRistorante, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Immagine cambiata con successo");
    } else {
      throw new Error("Errore nel cambio dell'immagine");
    }
  } catch (error) {
    toast.error("Errore nel cambio dell'immagine");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const updateStatus = (newStatus: LocalStatusDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/updatelocalstatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStatus),
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Stato cambiato con successo");
    } else {
      throw new Error("Errore nel cambio dello stato");
    }
  } catch (error) {
    toast.error("Errore nel cambio dello stato");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const newLocalPost = (newLocal: NewLocalDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/newlocalpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocal),
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Local Creato con successo");
    } else {
      throw new Error("Errore nella creazione del locale");
    }
  } catch (error) {
    toast.error("Errore nella creazione del locale");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const newIngredientiPost = (newIngredient: CreateIngredientDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/newingredientipost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIngredient),
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Local Creato con successo");
    } else {
      throw new Error("Errore nella creazione del locale");
    }
  } catch (error) {
    toast.error("Errore nella creazione del locale");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const GetIngredientiRistorante = (idRistorante: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/getingredientiristorante/" + idRistorante);
    if (response.ok) {
      const data: IngredientiProdottiLocale[] = await response.json();
      dispatch(setListaIngredienti(data));

      console.log(data);
    } else {
      throw new Error("Errore nel recupero dei giorni di chiusura");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei giorni di chiusura");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const updateIngredientiPut = (updateIngredient: UpdateIngredientDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/updateingredienti", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateIngredient),
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Ingrediente modificato con successo");
    } else {
      throw new Error("Errore nella modifica dell'ingrediente");
    }
  } catch (error) {
    toast.error("Errore nella modifica dell'ingrediente");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const GetProdottiRistorante = (idRistorante: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/getprodottiristorante/" + idRistorante);
    if (response.ok) {
      const data: ProdottiLocale[] = await response.json();
      dispatch(setListaProdotti(data));

      console.log(data);
    } else {
      throw new Error("Errore nel recupero dei prodotti");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei prodotti");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const GetListaTipi = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/gettipoprodotti");
    if (response.ok) {
      const data: GetTipoProdottoResponse[] = await response.json();
      dispatch(setListaTipi(data));

      console.log(data);
    } else {
      throw new Error("Errore nel recupero dei Tipi di prodotti");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei Tipi di prodotti");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const newProdottoPost = (newLocal: CreateProductDto, imgFile: File | null) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/newprodottopost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocal),
    });

    if (response.ok) {
      const idProdotto = await response.json();
      console.log(idProdotto);

      if (imgFile) {
        const formData = new FormData();
        formData.append("imgProdotto", imgFile);

        const responseImg = await fetchWithAuth(url + "backoffice/updateimgprodotto/" + idProdotto, {
          method: "PUT",
          body: formData,
        });

        if (responseImg.ok) {
          dispatch(toggleRefresh());
          toast.success("Immagine aggiunta con successo");
        } else {
          throw new Error("Errore nell'aggiunta dell'immagine");
        }
      }
      dispatch(toggleRefresh());
    } else {
      throw new Error("Errore nella creazione del prodotto");
    }
  } catch (error) {
    toast.error("Errore nella creazione del prodotto");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const editProdottoPut = (editLocal: EditProductDto, imgFile: File | null) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/updateprodotto", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editLocal),
    });

    if (response.ok) {
      const idProdotto = await response.json();
      console.log(idProdotto);

      if (imgFile) {
        const formData = new FormData();
        formData.append("imgProdotto", imgFile);

        const responseImg = await fetchWithAuth(url + "backoffice/updateimgprodotto/" + idProdotto, {
          method: "PUT",
          body: formData,
        });

        if (responseImg.ok) {
          dispatch(toggleRefresh());
          toast.success("Immagine aggiunta con successo");
        } else {
          throw new Error("Errore nell'aggiunta dell'immagine");
        }
      }
      dispatch(toggleRefresh());
    } else {
      throw new Error("Errore nella creazione del prodotto");
    }
  } catch (error) {
    toast.error("Errore nella creazione del prodotto");
  } finally {
    dispatch(setIsLoading(false));
  }
};
